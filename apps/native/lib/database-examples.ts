import { localDb } from './database';
import { createSyncManager } from '@hack-life/db/client';
import { habit, habitEntry, transaction, account } from '@hack-life/db/schema';
import { eq, and, desc } from '@hack-life/db';

// Example: Using the local-first database for habits
export class HabitService {
  // Create a new habit
  async createHabit(habitData: {
    userId: string;
    name: string;
    description?: string;
    category: string;
    frequency: string;
    targetValue?: number;
    unit?: string;
    color?: string;
    icon?: string;
  }) {
    return await localDb.write(async (db) => {
      const [newHabit] = await db.insert(habit).values({
        id: crypto.randomUUID(),
        ...habitData,
        targetValue: habitData.targetValue || 1,
        color: habitData.color || '#3B82F6',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return newHabit;
    });
  }

  // Get all habits for a user (read from local database)
  async getUserHabits(userId: string) {
    return await localDb.read(async (db) => {
      return await db
        .select()
        .from(habit)
        .where(eq(habit.userId, userId))
        .orderBy(desc(habit.createdAt));
    });
  }

  // Log a habit entry
  async logHabitEntry(entryData: {
    habitId: string;
    userId: string;
    date: string;
    value: number;
    notes?: string;
  }) {
    return await localDb.write(async (db) => {
      const [newEntry] = await db.insert(habitEntry).values({
        id: crypto.randomUUID(),
        ...entryData,
        completedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return newEntry;
    });
  }

  // Get habit entries for a date range
  async getHabitEntries(habitId: string, startDate: string, endDate: string) {
    return await localDb.read(async (db) => {
      return await db
        .select()
        .from(habitEntry)
        .where(
          and(
            eq(habitEntry.habitId, habitId),
            // Add date range filtering here
          )
        )
        .orderBy(desc(habitEntry.date));
    });
  }
}

// Example: Using the local-first database for finance
export class FinanceService {
  // Create a new account
  async createAccount(accountData: {
    userId: string;
    name: string;
    type: string;
    balance?: number;
    currency?: string;
    color?: string;
    icon?: string;
  }) {
    return await localDb.write(async (db) => {
      const [newAccount] = await db.insert(account).values({
        id: crypto.randomUUID(),
        ...accountData,
        balance: accountData.balance || 0,
        currency: accountData.currency || 'USD',
        color: accountData.color || '#3B82F6',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return newAccount;
    });
  }

  // Add a transaction
  async addTransaction(transactionData: {
    userId: string;
    accountId: string;
    categoryId?: string;
    amount: number;
    type: string;
    description: string;
    notes?: string;
    date: string;
    time?: string;
    tags?: string[];
  }) {
    return await localDb.write(async (db) => {
      const [newTransaction] = await db.insert(transaction).values({
        id: crypto.randomUUID(),
        ...transactionData,
        tags: transactionData.tags ? JSON.stringify(transactionData.tags) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      return newTransaction;
    });
  }

  // Get transactions for an account
  async getAccountTransactions(accountId: string, limit = 50) {
    return await localDb.read(async (db) => {
      return await db
        .select()
        .from(transaction)
        .where(eq(transaction.accountId, accountId))
        .orderBy(desc(transaction.createdAt))
        .limit(limit);
    });
  }
}

// Example: Using the sync manager for advanced synchronization
export class SyncService {
  private syncManager = createSyncManager(localDb, {
    conflictResolution: {
      strategy: 'merge',
      mergeFunction: (local, remote) => {
        // Custom merge logic: prefer newer data
        return new Date(local.updatedAt) > new Date(remote.updatedAt) ? local : remote;
      },
    },
    retryAttempts: 3,
    retryDelay: 2000,
  });

  // Perform manual sync
  async syncNow() {
    const result = await this.syncManager.performSync();
    
    if (result.success) {
      console.log(`Sync completed in ${result.duration}ms`);
    } else {
      console.error('Sync failed:', result.errors);
    }
    
    return result;
  }

  // Get sync status
  getSyncStatus() {
    return this.syncManager.getSyncStats();
  }

  // Force sync with custom options
  async forceSyncWithOptions(options: {
    conflictResolution?: 'remote_wins' | 'local_wins' | 'merge';
    retryAttempts?: number;
  }) {
    return await this.syncManager.forceSync(options);
  }
}

// Export service instances
export const habitService = new HabitService();
export const financeService = new FinanceService();
export const syncService = new SyncService();
