// Auth schema
export * from "./auth";

// Habits schema
export * from "./habits";

// Finance schema
export * from "./finance";

// Re-export all tables for convenience
import * as auth from "./auth";
import * as habits from "./habits";
import * as finance from "./finance";

export const schema = {
  ...auth,
  ...habits,
  ...finance,
};

// Export schema object for Drizzle
export default schema;
