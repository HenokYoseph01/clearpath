import * as SQLite from "expo-sqlite";
import { DistortionKey } from "@/constants/distortions";

export type StoredEmotion = {
  label: string;
  intensityBefore: number;
  intensityAfter?: number;
};

export type CrisisSessionRecord = {
  id: number;
  createdAt: number;
  situation: string;
  emotions: StoredEmotion[];
  automaticThoughts: string;
  distortions: DistortionKey[];
  evidenceFor?: string | null;
  evidenceAgainst?: string | null;
  friendPerspective?: string | null;
  balancedThought?: string | null;
  distressStart: number;
  distressEnd?: number | null;
  completed: boolean;
};

export type DailyCheckInRecord = {
  id: number;
  date: string;
  createdAt: number;
  moodLabel: string;
  moodScore: number;
  energy: "Low" | "Medium" | "High";
  note?: string | null;
};

const db = SQLite.openDatabaseSync("clearpath.db");

export function initializeDatabase(): void {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS crisis_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at INTEGER NOT NULL,
      situation TEXT NOT NULL,
      emotions TEXT NOT NULL,
      automatic_thoughts TEXT NOT NULL,
      distortions TEXT,
      evidence_for TEXT,
      evidence_against TEXT,
      friend_perspective TEXT,
      balanced_thought TEXT,
      distress_start INTEGER NOT NULL,
      distress_end INTEGER,
      completed INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS daily_check_ins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      mood_label TEXT NOT NULL,
      mood_score INTEGER NOT NULL,
      energy TEXT NOT NULL,
      note TEXT
    );

    CREATE TABLE IF NOT EXISTS training_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day INTEGER NOT NULL,
      completed_at INTEGER,
      exercise_key TEXT NOT NULL,
      reflection TEXT
    );

    CREATE TABLE IF NOT EXISTS user_meta (
      id INTEGER PRIMARY KEY,
      current_streak INTEGER NOT NULL DEFAULT 0,
      longest_streak INTEGER NOT NULL DEFAULT 0,
      last_active_date TEXT,
      onboarding_done INTEGER NOT NULL DEFAULT 0,
      reminder_time TEXT,
      ai_provider TEXT,
      notifications_on INTEGER NOT NULL DEFAULT 1,
      display_name TEXT
    );

    INSERT OR IGNORE INTO user_meta (id) VALUES (1);
  `);
}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapCrisis(row: Record<string, unknown>): CrisisSessionRecord {
  return {
    id: Number(row.id),
    createdAt: Number(row.created_at),
    situation: String(row.situation ?? ""),
    emotions: parseJson<StoredEmotion[]>(String(row.emotions ?? "[]"), []),
    automaticThoughts: String(row.automatic_thoughts ?? ""),
    distortions: parseJson<DistortionKey[]>(String(row.distortions ?? "[]"), []),
    evidenceFor: row.evidence_for as string | null,
    evidenceAgainst: row.evidence_against as string | null,
    friendPerspective: row.friend_perspective as string | null,
    balancedThought: row.balanced_thought as string | null,
    distressStart: Number(row.distress_start),
    distressEnd: row.distress_end == null ? null : Number(row.distress_end),
    completed: Number(row.completed) === 1,
  };
}

export function saveCrisisSession(session: Omit<CrisisSessionRecord, "id" | "createdAt" | "completed">): void {
  db.runSync(
    `INSERT INTO crisis_sessions (
      created_at, situation, emotions, automatic_thoughts, distortions, evidence_for,
      evidence_against, friend_perspective, balanced_thought, distress_start, distress_end, completed
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    Date.now(),
    session.situation,
    JSON.stringify(session.emotions),
    session.automaticThoughts,
    JSON.stringify(session.distortions),
    session.evidenceFor ?? null,
    session.evidenceAgainst ?? null,
    session.friendPerspective ?? null,
    session.balancedThought ?? null,
    session.distressStart,
    session.distressEnd ?? null,
  );
}

export function listCrisisSessions(): CrisisSessionRecord[] {
  const rows = db.getAllSync<Record<string, unknown>>("SELECT * FROM crisis_sessions ORDER BY created_at DESC");
  return rows.map(mapCrisis);
}

export function getCrisisSession(id: number): CrisisSessionRecord | null {
  const row = db.getFirstSync<Record<string, unknown>>("SELECT * FROM crisis_sessions WHERE id = ?", id);
  return row ? mapCrisis(row) : null;
}

export function addDailyCheckIn(checkIn: Omit<DailyCheckInRecord, "id" | "createdAt">): void {
  db.runSync(
    "INSERT INTO daily_check_ins (date, created_at, mood_label, mood_score, energy, note) VALUES (?, ?, ?, ?, ?, ?)",
    checkIn.date,
    Date.now(),
    checkIn.moodLabel,
    checkIn.moodScore,
    checkIn.energy,
    checkIn.note ?? null,
  );
}

export function listDailyCheckIns(limit = 30): DailyCheckInRecord[] {
  return db
    .getAllSync<Record<string, unknown>>("SELECT * FROM daily_check_ins ORDER BY created_at DESC LIMIT ?", limit)
    .map((row) => ({
      id: Number(row.id),
      date: String(row.date),
      createdAt: Number(row.created_at),
      moodLabel: String(row.mood_label),
      moodScore: Number(row.mood_score),
      energy: String(row.energy) as DailyCheckInRecord["energy"],
      note: row.note as string | null,
    }));
}

export function completeTrainingDay(day: number, exerciseKey: string, reflection: string): void {
  db.runSync(
    "INSERT INTO training_progress (day, completed_at, exercise_key, reflection) VALUES (?, ?, ?, ?)",
    day,
    Date.now(),
    exerciseKey,
    reflection,
  );
}

export function clearAllData(): void {
  db.execSync("DELETE FROM crisis_sessions; DELETE FROM daily_check_ins; DELETE FROM training_progress; UPDATE user_meta SET current_streak = 0, longest_streak = 0, last_active_date = NULL;");
}
