import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const habit = sqliteTable("habit", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // e.g., "health", "productivity", "learning"
  frequency: text("frequency").notNull(), // "daily", "weekly", "custom"
  targetValue: integer("target_value").notNull().default(1),
  unit: text("unit"), // e.g., "times", "minutes", "pages"
  color: text("color").notNull().default("#3B82F6"),
  icon: text("icon"), // Icon name or emoji
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const habitEntry = sqliteTable("habit_entry", {
  id: text("id").primaryKey(),
  habitId: text("habit_id")
    .notNull()
    .references(() => habit.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  date: text("date").notNull(), // YYYY-MM-DD format
  value: real("value").notNull().default(0),
  notes: text("notes"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const habitStreak = sqliteTable("habit_streak", {
  id: text("id").primaryKey(),
  habitId: text("habit_id")
    .notNull()
    .references(() => habit.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastCompletedDate: text("last_completed_date"), // YYYY-MM-DD format
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const habitReminder = sqliteTable("habit_reminder", {
  id: text("id").primaryKey(),
  habitId: text("habit_id")
    .notNull()
    .references(() => habit.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  time: text("time").notNull(), // HH:MM format
  days: text("days").notNull(), // JSON array of days [0,1,2,3,4,5,6] (0=Sunday)
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
