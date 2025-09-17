import type { NativeDatabase, SyncStatus } from './native';

export interface ConflictResolutionStrategy {
  strategy: 'remote_wins' | 'local_wins' | 'merge' | 'manual';
  mergeFunction?: (localData: any, remoteData: any) => any;
}

export interface SyncOptions {
  conflictResolution: ConflictResolutionStrategy;
  retryAttempts?: number;
  retryDelay?: number;
  batchSize?: number;
}

export interface SyncResult {
  success: boolean;
  conflictsResolved: number;
  errors: string[];
  duration: number;
}

export class SyncManager {
  private database: NativeDatabase;
  private options: SyncOptions;

  constructor(database: NativeDatabase, options: SyncOptions) {
    this.database = database;
    this.options = {
      retryAttempts: 3,
      retryDelay: 1000,
      batchSize: 100,
      ...options,
    };
  }

  // Perform intelligent sync with conflict resolution
  async performSync(): Promise<SyncResult> {
    const startTime = Date.now();
    const result: SyncResult = {
      success: false,
      conflictsResolved: 0,
      errors: [],
      duration: 0,
    };

    try {
      // Check if we're online
      if (!this.database.status.isOnline) {
        throw new Error('Device is offline');
      }

      // Perform sync with retry logic
      await this.syncWithRetry();
      
      result.success = true;
      console.log('Sync completed successfully');
    } catch (error) {
      result.errors.push(error instanceof Error ? error.message : 'Unknown error');
      console.error('Sync failed:', error);
    } finally {
      result.duration = Date.now() - startTime;
    }

    return result;
  }

  // Sync with retry logic
  private async syncWithRetry(): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.options.retryAttempts!; attempt++) {
      try {
        await this.database.syncWithRemote();
        return; // Success, exit retry loop
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < this.options.retryAttempts!) {
          console.log(`Sync attempt ${attempt} failed, retrying in ${this.options.retryDelay}ms...`);
          await this.delay(this.options.retryDelay!);
        }
      }
    }

    throw lastError || new Error('All sync attempts failed');
  }

  // Handle sync conflicts
  private async handleConflicts(localData: any[], remoteData: any[]): Promise<any[]> {
    const conflicts: any[] = [];
    const resolved: any[] = [];

    // Identify conflicts (simplified logic)
    for (const localItem of localData) {
      const remoteItem = remoteData.find(r => r.id === localItem.id);
      
      if (remoteItem && this.hasConflict(localItem, remoteItem)) {
        conflicts.push({ local: localItem, remote: remoteItem });
      } else {
        resolved.push(remoteItem || localItem);
      }
    }

    // Resolve conflicts based on strategy
    for (const conflict of conflicts) {
      const resolvedItem = await this.resolveConflict(conflict.local, conflict.remote);
      resolved.push(resolvedItem);
    }

    return resolved;
  }

  // Check if two items have conflicts
  private hasConflict(local: any, remote: any): boolean {
    // Simple conflict detection based on updated_at timestamps
    return new Date(local.updatedAt) > new Date(remote.updatedAt) &&
           new Date(remote.updatedAt) > new Date(local.createdAt);
  }

  // Resolve a single conflict
  private async resolveConflict(localData: any, remoteData: any): Promise<any> {
    switch (this.options.conflictResolution.strategy) {
      case 'remote_wins':
        return remoteData;
      
      case 'local_wins':
        return localData;
      
      case 'merge':
        if (this.options.conflictResolution.mergeFunction) {
          return this.options.conflictResolution.mergeFunction(localData, remoteData);
        }
        // Default merge: combine fields, remote wins for conflicts
        return { ...localData, ...remoteData };
      
      case 'manual':
        // In a real implementation, you would show a UI for manual resolution
        // For now, default to remote wins
        return remoteData;
      
      default:
        return remoteData;
    }
  }

  // Utility method to delay execution
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get sync statistics
  getSyncStats(): {
    status: SyncStatus;
    pendingChanges: number;
    lastSyncTime: Date | null;
    isOnline: boolean;
  } {
    return {
      status: this.database.status,
      pendingChanges: this.database.getPendingChangesCount(),
      lastSyncTime: this.database.status.lastSync,
      isOnline: this.database.status.isOnline,
    };
  }

  // Force sync with custom options
  async forceSync(options?: Partial<SyncOptions>): Promise<SyncResult> {
    const originalOptions = this.options;
    this.options = { ...this.options, ...options };
    
    try {
      return await this.performSync();
    } finally {
      this.options = originalOptions;
    }
  }
}

// Factory function to create sync manager
export function createSyncManager(
  database: NativeDatabase,
  options: SyncOptions
): SyncManager {
  return new SyncManager(database, options);
}
