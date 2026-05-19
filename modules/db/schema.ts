import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const crisisSessions = sqliteTable("crisis_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("created_at").notNull(),
  situation: text("situation").notNull(),
  emotions: text("emotions").notNull(),
  automaticThoughts: text("automatic_thoughts").notNull(),
  distortions: text("distortions"),
  evidenceFor: text("evidence_for"),
  evidenceAgainst: text("evidence_against"),
  friendPerspective: text("friend_perspective"),
  balancedThought: text("balanced_thought"),
  distressStart: integer("distress_start").notNull(),
  distressEnd: integer("distress_end"),
  completed: integer("completed").notNull().default(0),
});

export const dailyCheckIns = sqliteTable("daily_check_ins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  createdAt: integer("created_at").notNull(),
  moodLabel: text("mood_label").notNull(),
  moodScore: integer("mood_score").notNull(),
  energy: text("energy").notNull(),
  note: text("note"),
});

export const trainingProgress = sqliteTable("training_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  day: integer("day").notNull(),
  completedAt: integer("completed_at"),
  exerciseKey: text("exercise_key").notNull(),
  reflection: text("reflection"),
});

export const userMeta = sqliteTable("user_meta", {
  id: integer("id").primaryKey(),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActiveDate: text("last_active_date"),
  onboardingDone: integer("onboarding_done").notNull().default(0),
  reminderTime: text("reminder_time"),
  aiProvider: text("ai_provider"),
  notificationsOn: integer("notifications_on").notNull().default(1),
  displayName: text("display_name"),
});
