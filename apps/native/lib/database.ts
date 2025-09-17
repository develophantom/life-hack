import { createNativeDatabase } from '@hack-life/db/client';
import NetInfo from '@react-native-community/netinfo';

// Database configuration
const databaseConfig = {
  localDbPath: 'hacklife.db',
  remoteUrl: process.env.EXPO_PUBLIC_DATABASE_URL || '',
  authToken: process.env.EXPO_PUBLIC_DATABASE_AUTH_TOKEN,
  syncInterval: 5000, // Sync every 5 seconds when online
};

// Create singleton instance
export const localDb = createNativeDatabase(databaseConfig);

// Set up network listener for automatic sync
NetInfo.addEventListener(state => {
  const isOnline = state.isConnected ?? false;
  
  if (isOnline && localDb.getPendingChangesCount() > 0) {
    // Device came online with pending changes, trigger sync
    localDb.syncWithRemote().catch(console.error);
  }
});

// Start automatic syncing
localDb.startAutoSync();

// Export types and utilities
export type { NativeDatabaseConfig, SyncStatus } from '@hack-life/db/client';
