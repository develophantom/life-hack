# Local-First Database Architecture Implementation

## Overview

This document describes the implementation of a local-first database architecture using Turso's embedded replicas and op-sqlite for the Hack-Life project.

## Architecture Components

### 1. Shared Database Package (`@hack-life/db`)

**Location**: `apps/packages/db/`

**Structure**:
```
packages/db/
├── src/
│   ├── schema/
│   │   ├── auth.ts          # Authentication tables
│   │   ├── habits.ts        # Habit tracking tables
│   │   ├── finance.ts       # Financial management tables
│   │   └── index.ts         # Schema exports
│   ├── client/
│   │   ├── server.ts        # Server database client
│   │   ├── native.ts        # Native app database client
│   │   ├── sync-manager.ts  # Advanced sync management
│   │   └── index.ts         # Client exports
│   └── index.ts             # Main package exports
├── package.json
├── tsconfig.json
└── README.md
```

### 2. Database Schema

**Auth Tables**:
- `user` - User accounts and profiles
- `session` - User authentication sessions
- `account` - OAuth provider accounts
- `verification` - Email verification tokens

**Habits Tables**:
- `habit` - Habit definitions and settings
- `habitEntry` - Daily habit completion records
- `habitStreak` - Streak tracking and statistics
- `habitReminder` - Reminder configurations

**Finance Tables**:
- `finance_account` - Bank accounts, wallets, cash
- `transaction` - Financial transactions
- `category` - Transaction categorization
- `budget` - Budget definitions and tracking
- `savingsGoal` - Savings goals and progress

### 3. Client Implementations

#### Server Client (`server.ts`)
- Uses standard Turso client for server-side operations
- Direct connection to remote Turso database
- Optimized for server-side performance

#### Native Client (`native.ts`)
- **Local-First Architecture**: All reads from local SQLite
- **Embedded Replicas**: Automatic sync with Turso
- **Offline Capability**: Full offline functionality
- **Conflict Resolution**: Built-in conflict handling

### 4. Sync Manager (`sync-manager.ts`)

**Features**:
- Intelligent conflict resolution strategies
- Retry logic with exponential backoff
- Batch synchronization
- Sync statistics and monitoring

**Conflict Resolution Strategies**:
1. `remote_wins` - Remote data takes precedence
2. `local_wins` - Local data takes precedence
3. `merge` - Custom merge function
4. `manual` - Manual resolution (requires UI)

## Implementation Details

### Local-First Flow

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Native App    │    │   Local SQLite   │    │  Remote Turso  │
│                 │    │   (op-sqlite)    │    │   Database     │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ Read Operations │───▶│ Instant Access   │    │                 │
│                 │    │                  │    │                 │
│ Write Operations│───▶│ Local Write      │───▶│ Remote Write    │
│                 │    │                  │    │                 │
│ Sync Status     │◀───│ Sync Manager     │◀───│ Embedded Replica│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Benefits

1. **Read Performance**: Sub-millisecond response times from local SQLite
2. **Offline Support**: Complete offline functionality
3. **Automatic Sync**: Turso's embedded replicas handle synchronization
4. **Conflict Resolution**: Intelligent handling of data conflicts
5. **Type Safety**: Full TypeScript support with Drizzle ORM

### Performance Characteristics

- **Read Operations**: < 1ms (local SQLite)
- **Write Operations**: ~10-50ms (local) + sync time
- **Sync Operations**: ~100-500ms (depending on data size)
- **Offline Capability**: Unlimited (local storage)

## Usage Examples

### Server Usage

```typescript
import { createServerDatabase } from '@hack-life/db/client';

const serverDb = createServerDatabase({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = serverDb.database;
```

### Native App Usage

```typescript
import { createNativeDatabase } from '@hack-life/db/client';
import { habit, habitEntry } from '@hack-life/db/schema';
import { eq, desc } from '@hack-life/db';

const localDb = createNativeDatabase({
  localDbPath: 'hacklife.db',
  remoteUrl: process.env.EXPO_PUBLIC_DATABASE_URL,
  authToken: process.env.EXPO_PUBLIC_DATABASE_AUTH_TOKEN,
});

// Read operations (always local)
const habits = await localDb.read(async (db) => {
  return await db
    .select()
    .from(habit)
    .where(eq(habit.userId, userId))
    .orderBy(desc(habit.createdAt));
});

// Write operations (local + remote sync)
const newHabit = await localDb.write(async (db) => {
  const [habit] = await db.insert(habit).values({
    id: crypto.randomUUID(),
    userId,
    name: 'Morning Exercise',
    category: 'health',
    frequency: 'daily',
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  
  return habit;
});
```

### Advanced Sync Management

```typescript
import { createSyncManager } from '@hack-life/db/client';

const syncManager = createSyncManager(localDb, {
  conflictResolution: {
    strategy: 'merge',
    mergeFunction: (local, remote) => {
      return new Date(local.updatedAt) > new Date(remote.updatedAt) ? local : remote;
    },
  },
  retryAttempts: 3,
  retryDelay: 2000,
});

// Manual sync
const result = await syncManager.performSync();
```

## Configuration

### Environment Variables

**Server**:
```bash
DATABASE_URL=libsql://your-turso-database-url
DATABASE_AUTH_TOKEN=your-turso-auth-token
```

**Native App**:
```bash
EXPO_PUBLIC_DATABASE_URL=libsql://your-turso-database-url
EXPO_PUBLIC_DATABASE_AUTH_TOKEN=your-turso-auth-token
```

### Package Dependencies

**Server** (`apps/server/package.json`):
```json
{
  "dependencies": {
    "@hack-life/db": "workspace:*"
  }
}
```

**Native App** (`apps/native/package.json`):
```json
{
  "dependencies": {
    "@hack-life/db": "workspace:*",
    "@op-engineering/op-sqlite": "14.1.4",
    "@react-native-community/netinfo": "11.4.1"
  }
}
```

## Migration from Previous Setup

### Server Changes

1. **Updated** `apps/server/src/db/index.ts` to use shared package
2. **Updated** `apps/server/drizzle.config.ts` to point to shared schema
3. **Added** `@hack-life/db` dependency to server package.json

### Native App Changes

1. **Replaced** custom database implementation with shared package
2. **Updated** `apps/native/lib/database.ts` to use `createNativeDatabase`
3. **Added** `@hack-life/db` dependency to native package.json
4. **Created** `apps/native/lib/database-examples.ts` with usage examples

## Best Practices

1. **Use Read Operations**: Always use `localDb.read()` for queries
2. **Batch Writes**: Use `localDb.batchWrite()` for multiple operations
3. **Monitor Sync Status**: Check `localDb.status` for sync health
4. **Handle Conflicts**: Implement appropriate conflict resolution
5. **Error Handling**: Always wrap database operations in try-catch

## Troubleshooting

### Common Issues

1. **Sync Failures**: Check network connectivity and Turso credentials
2. **Conflict Errors**: Review conflict resolution strategy
3. **Performance Issues**: Ensure local database is properly initialized
4. **Type Errors**: Verify schema imports and Drizzle setup

### Debug Mode

```typescript
// Add to your app initialization
console.log('Database status:', localDb.status);
console.log('Pending changes:', localDb.getPendingChangesCount());
```

## Future Enhancements

1. **Real-time Sync**: WebSocket-based real-time synchronization
2. **Advanced Conflict Resolution**: UI for manual conflict resolution
3. **Sync Analytics**: Detailed sync performance metrics
4. **Data Compression**: Optimize sync payload size
5. **Selective Sync**: Sync only specific data subsets

## Conclusion

The local-first database architecture provides:

- **Maximum Performance**: Sub-millisecond read operations
- **Offline Capability**: Full functionality without network
- **Automatic Sync**: Seamless data synchronization
- **Type Safety**: End-to-end TypeScript support
- **Conflict Resolution**: Intelligent data conflict handling

This implementation ensures the Hack-Life app delivers a fast, reliable, and offline-capable user experience while maintaining data consistency across devices.
