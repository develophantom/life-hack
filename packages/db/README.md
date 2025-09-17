# @hack-life/db

A shared database package for the Hack-Life monorepo, providing local-first architecture with Turso's embedded replicas and op-sqlite.

## Features

- **Local-First Architecture**: All read operations execute against local SQLite database for maximum performance
- **Remote Sync**: Automatic synchronization with Turso's embedded replicas
- **Offline Capability**: Full offline functionality with automatic sync when online
- **Conflict Resolution**: Intelligent conflict resolution strategies
- **Type Safety**: Full TypeScript support with Drizzle ORM
- **Shared Schema**: Common database schema for server and native apps

## Architecture

### Local-First Database Flow

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

1. **Read Performance**: All reads from local SQLite = sub-millisecond response times
2. **Offline Support**: App works completely offline, syncs when connection restored
3. **Automatic Sync**: Turso's embedded replicas handle synchronization automatically
4. **Conflict Resolution**: Built-in strategies for handling data conflicts
5. **Type Safety**: End-to-end TypeScript with Drizzle ORM

## Installation

The package is already configured in the monorepo workspace. No additional installation needed.

## Usage

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
      // Custom merge logic
      return new Date(local.updatedAt) > new Date(remote.updatedAt) ? local : remote;
    },
  },
  retryAttempts: 3,
  retryDelay: 2000,
});

// Manual sync
const result = await syncManager.performSync();

// Get sync status
const stats = syncManager.getSyncStats();
console.log(`Pending changes: ${stats.pendingChanges}`);
console.log(`Last sync: ${stats.lastSyncTime}`);
```

## Database Schema

### Auth Tables
- `user` - User accounts
- `session` - User sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

### Habits Tables
- `habit` - Habit definitions
- `habitEntry` - Daily habit completions
- `habitStreak` - Streak tracking
- `habitReminder` - Reminder settings

### Finance Tables
- `finance_account` - Bank accounts, wallets, etc.
- `transaction` - Financial transactions
- `category` - Transaction categories
- `budget` - Budget definitions
- `savingsGoal` - Savings goals

## Configuration

### Environment Variables

**Server:**
```bash
DATABASE_URL=libsql://your-turso-database-url
DATABASE_AUTH_TOKEN=your-turso-auth-token
```

**Native App:**
```bash
EXPO_PUBLIC_DATABASE_URL=libsql://your-turso-database-url
EXPO_PUBLIC_DATABASE_AUTH_TOKEN=your-turso-auth-token
```

### Sync Options

```typescript
interface NativeDatabaseConfig {
  localDbPath: string;           // Local SQLite file path
  remoteUrl: string;             // Turso database URL
  authToken?: string;            // Turso auth token
  syncInterval?: number;        // Auto-sync interval (ms)
}
```

## Conflict Resolution Strategies

1. **`remote_wins`**: Remote data always takes precedence
2. **`local_wins`**: Local data always takes precedence
3. **`merge`**: Custom merge function combines data
4. **`manual`**: Manual resolution (requires UI)

## Performance Characteristics

- **Read Operations**: < 1ms (local SQLite)
- **Write Operations**: ~10-50ms (local) + sync time
- **Sync Operations**: ~100-500ms (depending on data size)
- **Offline Capability**: Unlimited (local storage)

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

Enable debug logging:
```typescript
// Add to your app initialization
console.log('Database status:', localDb.status);
console.log('Pending changes:', localDb.getPendingChangesCount());
```

## Development

### Building the Package

```bash
cd apps/packages/db
bun run build
```

### Running Tests

```bash
bun run test
```

### Database Migrations

```bash
# From server directory
bun run db:generate
bun run db:push
```
