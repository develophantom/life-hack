import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../schema';

// Dynamic imports for React Native dependencies
let open: any;
try {
  const opSqlite = require('@op-engineering/op-sqlite');
  open = opSqlite.open;
} catch (error) {
  console.warn('op-sqlite not available, using fallback');
  // Fallback for non-React Native environments
  open = () => {
    throw new Error('op-sqlite is required for native database client');
  };
}

export interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingChanges: number;
  isSyncing: boolean;
}

export interface NativeDatabaseConfig {
  localDbPath: string;
  remoteUrl: string;
  authToken?: string;
  syncInterval?: number;
}

export class NativeDatabase {
  private localDb: any;
  private remoteClient: any;
  private db: any;
  private config: NativeDatabaseConfig;
  private syncStatus: SyncStatus = {
    isOnline: false,
    lastSync: null,
    pendingChanges: 0,
    isSyncing: false,
  };
  private syncIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor(config: NativeDatabaseConfig) {
    this.config = {
      syncInterval: 5000, // Default 5 seconds
      ...config,
    };
    this.initializeDatabases();
    this.setupNetworkListener();
  }

  private initializeDatabases() {
    try {
      // Initialize local SQLite database with op-sqlite
      this.localDb = open({
        name: 'hacklife_local',
        location: this.config.localDbPath,
        encryptionKey: 'hacklife-encryption-key', // In production, use secure key management
      });

      // Initialize remote Turso client for embedded replica
      this.remoteClient = createClient({
        url: this.config.remoteUrl,
        authToken: this.config.authToken,
        syncUrl: this.config.remoteUrl,
        syncInterval: this.config.syncInterval,
      });

      // Create Drizzle instance with local database
      this.db = drizzle(this.localDb, { schema });

      console.log('Local-first database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private setupNetworkListener() {
    // Note: In a real implementation, you would use NetInfo here
    // For now, we'll assume online status and handle it in the sync methods
    this.syncStatus.isOnline = true;
  }

  // Get the Drizzle instance for database operations
  get database() {
    return this.db;
  }

  // Get current sync status
  get status(): SyncStatus {
    return { ...this.syncStatus };
  }

  // Sync local database with remote Turso database
  async syncWithRemote(): Promise<void> {
    if (this.syncStatus.isSyncing || !this.syncStatus.isOnline) {
      return;
    }

    this.syncStatus.isSyncing = true;

    try {
      // Use Turso's embedded replica sync
      await this.remoteClient.sync();
      
      this.syncStatus.lastSync = new Date();
      this.syncStatus.pendingChanges = 0;
      
      console.log('Database sync completed successfully');
    } catch (error) {
      console.error('Database sync failed:', error);
      throw error;
    } finally {
      this.syncStatus.isSyncing = false;
    }
  }

  // Force sync (useful for manual refresh)
  async forceSync(): Promise<void> {
    this.syncStatus.isSyncing = true;
    
    try {
      await this.syncWithRemote();
    } finally {
      this.syncStatus.isSyncing = false;
    }
  }

  // Execute read operations (always against local database)
  async read<T>(operation: (db: any) => Promise<T>): Promise<T> {
    try {
      return await operation(this.db);
    } catch (error) {
      console.error('Read operation failed:', error);
      throw error;
    }
  }

  // Execute write operations (write to remote, sync to local)
  async write<T>(operation: (db: any) => Promise<T>): Promise<T> {
    try {
      // Execute the operation
      const result = await operation(this.db);
      
      // Increment pending changes counter
      this.syncStatus.pendingChanges++;
      
      // If online, sync immediately
      if (this.syncStatus.isOnline) {
        await this.syncWithRemote();
      }
      
      return result;
    } catch (error) {
      console.error('Write operation failed:', error);
      throw error;
    }
  }

  // Batch write operations for better performance
  async batchWrite<T>(operations: ((db: any) => Promise<any>)[]): Promise<T[]> {
    try {
      const results: T[] = [];
      
      for (const operation of operations) {
        const result = await operation(this.db);
        results.push(result);
      }
      
      // Increment pending changes
      this.syncStatus.pendingChanges += operations.length;
      
      // Sync if online
      if (this.syncStatus.isOnline) {
        await this.syncWithRemote();
      }
      
      return results;
    } catch (error) {
      console.error('Batch write operation failed:', error);
      throw error;
    }
  }

  // Execute a transaction
  async transaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
    return await this.db.transaction(callback);
  }

  // Get pending changes count
  getPendingChangesCount(): number {
    return this.syncStatus.pendingChanges;
  }

  // Check if database is ready
  isReady(): boolean {
    return this.localDb && this.remoteClient && this.db;
  }

  // Start automatic syncing
  startAutoSync(): void {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
    }

    this.syncIntervalId = setInterval(async () => {
      if (this.syncStatus.isOnline && this.syncStatus.pendingChanges > 0) {
        await this.syncWithRemote();
      }
    }, this.config.syncInterval);
  }

  // Stop automatic syncing
  stopAutoSync(): void {
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  // Close database connections
  async close(): Promise<void> {
    try {
      this.stopAutoSync();
      
      if (this.localDb) {
        this.localDb.close();
      }
      if (this.remoteClient) {
        await this.remoteClient.close();
      }
    } catch (error) {
      console.error('Error closing database:', error);
    }
  }
}

// Factory function to create native database instance
export function createNativeDatabase(config: NativeDatabaseConfig): NativeDatabase {
  return new NativeDatabase(config);
}
