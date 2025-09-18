import { createServerDatabase } from "@hack-life/db/client";

const serverDb = createServerDatabase({
  url: process.env.DATABASE_URL || "",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = serverDb.database;
