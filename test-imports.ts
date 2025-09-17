// Test TypeScript imports
import { createServerDatabase, createNativeDatabase } from '@hack-life/db/client';
import { habit, user } from '@hack-life/db/schema';
import { eq } from '@hack-life/db';

console.log('✅ All imports successful');
console.log('Server client:', typeof createServerDatabase);
console.log('Native client:', typeof createNativeDatabase);
console.log('Schema exports:', { habit: typeof habit, user: typeof user });
console.log('Drizzle utilities:', typeof eq);
