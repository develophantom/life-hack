import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../schema";

export interface ServerDatabaseConfig {
   url: string;
   authToken?: string;
}

export class ServerDatabase {
   private client: any;
   private db: any;

   constructor(config: ServerDatabaseConfig) {
      this.client = createClient({
         url: config.url,
         authToken: config.authToken,
      });

      this.db = drizzle(this.client, { schema });
   }

   // Get the Drizzle instance for database operations
   get database() {
      return this.db;
   }

   // Execute a transaction
   async transaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
      return await this.db.transaction(callback);
   }

   // Close the database connection
   async close(): Promise<void> {
      await this.client.close();
   }

   // Check if database is ready
   isReady(): boolean {
      return this.client && this.db;
   }
}

// Factory function to create server database instance
export function createServerDatabase(config: ServerDatabaseConfig): ServerDatabase {
   return new ServerDatabase(config);
}
