import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const financeAccount = sqliteTable("finance_account", {
   id: text("id").primaryKey(),
   userId: text("user_id")
      .notNull()
      .references(() => user.id),
   name: text("name").notNull(),
   type: text("type").notNull(), // "checking", "savings", "credit", "investment", "cash"
   balance: real("balance").notNull().default(0),
   currency: text("currency").notNull().default("USD"),
   color: text("color").notNull().default("#3B82F6"),
   icon: text("icon"), // Icon name or emoji
   isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
   updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const transaction = sqliteTable("transaction", {
   id: text("id").primaryKey(),
   userId: text("user_id")
      .notNull()
      .references(() => user.id),
   accountId: text("account_id")
      .notNull()
      .references(() => financeAccount.id),
   categoryId: text("category_id")
      .references(() => category.id),
   amount: real("amount").notNull(),
   type: text("type").notNull(), // "income", "expense", "transfer"
   description: text("description").notNull(),
   notes: text("notes"),
   date: text("date").notNull(), // YYYY-MM-DD format
   time: text("time"), // HH:MM format
   tags: text("tags"), // JSON array of tags
   isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(false),
   recurringPattern: text("recurring_pattern"), // "daily", "weekly", "monthly", "yearly"
   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
   updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const category = sqliteTable("category", {
   id: text("id").primaryKey(),
   userId: text("user_id")
      .notNull()
      .references(() => user.id),
   name: text("name").notNull(),
   type: text("type").notNull(), // "income", "expense"
   parentId: text("parent_id")
      .references(() => category.id), // For subcategories
   color: text("color").notNull().default("#6B7280"),
   icon: text("icon"), // Icon name or emoji
   isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
   updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const budget = sqliteTable("budget", {
   id: text("id").primaryKey(),
   userId: text("user_id")
      .notNull()
      .references(() => user.id),
   categoryId: text("category_id")
      .notNull()
      .references(() => category.id),
   amount: real("amount").notNull(),
   period: text("period").notNull(), // "monthly", "weekly", "yearly"
   startDate: text("start_date").notNull(), // YYYY-MM-DD format
   endDate: text("end_date"), // YYYY-MM-DD format, null for ongoing
   isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
   updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const savingsGoal = sqliteTable("savings_goal", {
   id: text("id").primaryKey(),
   userId: text("user_id")
      .notNull()
      .references(() => user.id),
   name: text("name").notNull(),
   description: text("description"),
   targetAmount: real("target_amount").notNull(),
   currentAmount: real("current_amount").notNull().default(0),
   targetDate: text("target_date"), // YYYY-MM-DD format
   color: text("color").notNull().default("#10B981"),
   icon: text("icon"), // Icon name or emoji
   isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
   createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
   updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
