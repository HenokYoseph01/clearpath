import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
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

export type TrainingProgressRecord = {
  id: number;
  day: number;
  completedAt: number | null;
  exerciseKey: string;
  reflection: string | null;
};

type WebDatabaseShape = {
  crisisSessions: CrisisSessionRecord[];
  dailyCheckIns: DailyCheckInRecord[];
  trainingProgress: TrainingProgressRecord[];
};

const webStorageKey = "clearpath.webDb";
let db: SQLite.SQLiteDatabase | null = null;

function isWebRuntime(): boolean {
  return Platform.OS === "web";
}

function getDb(): SQLite.SQLiteDatabase {
  if (isWebRuntime()) {
    throw new Error("SQLite native database is not used on web.");
  }
  if (!db) {
    db = SQLite.openDatabaseSync("clearpath.db");
  }
  return db;
}

function readWebDatabase(): WebDatabaseShape {
  if (typeof localStorage === "undefined") {
    return { crisisSessions: [], dailyCheckIns: [], trainingProgress: [] };
  }
  const stored = localStorage.getItem(webStorageKey);
  if (!stored) {
    return { crisisSessions: [], dailyCheckIns: [], trainingProgress: [] };
  }
  try {
    const parsed = JSON.parse(stored) as Partial<WebDatabaseShape>;
    return {
      crisisSessions: parsed.crisisSessions ?? [],
      dailyCheckIns: parsed.dailyCheckIns ?? [],
      trainingProgress: parsed.trainingProgress ?? [],
    };
  } catch {
    return { crisisSessions: [], dailyCheckIns: [], trainingProgress: [] };
  }
}

function writeWebDatabase(next: WebDatabaseShape): void {
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage.setItem(webStorageKey, JSON.stringify(next));
}

function nextId(records: { id: number }[]): number {
  return records.reduce((max, record) => Math.max(max, record.id), 0) + 1;
}

export function initializeDatabase(): void {
  if (isWebRuntime()) {
    writeWebDatabase(readWebDatabase());
    return;
  }

  getDb().execSync(`
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
  if (isWebRuntime()) {
    const webDb = readWebDatabase();
    webDb.crisisSessions.unshift({
      ...session,
      id: nextId(webDb.crisisSessions),
      createdAt: Date.now(),
      completed: true,
    });
    writeWebDatabase(webDb);
    return;
  }

  getDb().runSync(
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
  if (isWebRuntime()) {
    return readWebDatabase().crisisSessions.sort((a, b) => b.createdAt - a.createdAt);
  }

  const rows = getDb().getAllSync<Record<string, unknown>>("SELECT * FROM crisis_sessions ORDER BY created_at DESC");
  return rows.map(mapCrisis);
}

export function getCrisisSession(id: number): CrisisSessionRecord | null {
  if (isWebRuntime()) {
    return readWebDatabase().crisisSessions.find((session) => session.id === id) ?? null;
  }

  const row = getDb().getFirstSync<Record<string, unknown>>("SELECT * FROM crisis_sessions WHERE id = ?", id);
  return row ? mapCrisis(row) : null;
}

export function addDailyCheckIn(checkIn: Omit<DailyCheckInRecord, "id" | "createdAt">): void {
  if (isWebRuntime()) {
    const webDb = readWebDatabase();
    webDb.dailyCheckIns.unshift({
      ...checkIn,
      id: nextId(webDb.dailyCheckIns),
      createdAt: Date.now(),
    });
    writeWebDatabase(webDb);
    return;
  }

  getDb().runSync(
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
  if (isWebRuntime()) {
    return readWebDatabase()
      .dailyCheckIns.sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  }

  return getDb()
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
  if (isWebRuntime()) {
    const webDb = readWebDatabase();
    if (webDb.trainingProgress.some((record) => record.day === day)) {
      return;
    }
    webDb.trainingProgress.push({
      id: nextId(webDb.trainingProgress),
      day,
      completedAt: Date.now(),
      exerciseKey,
      reflection,
    });
    writeWebDatabase(webDb);
    return;
  }

  const existing = getDb().getFirstSync<{ id: number }>("SELECT id FROM training_progress WHERE day = ? LIMIT 1", day);
  if (existing) {
    return;
  }

  getDb().runSync(
    "INSERT INTO training_progress (day, completed_at, exercise_key, reflection) VALUES (?, ?, ?, ?)",
    day,
    Date.now(),
    exerciseKey,
    reflection,
  );
}

export function listTrainingProgress(): TrainingProgressRecord[] {
  if (isWebRuntime()) {
    return [...readWebDatabase().trainingProgress].sort((a, b) => a.day - b.day);
  }

  return getDb()
    .getAllSync<Record<string, unknown>>("SELECT * FROM training_progress ORDER BY day ASC")
    .map((row) => ({
      id: Number(row.id),
      day: Number(row.day),
      completedAt: row.completed_at == null ? null : Number(row.completed_at),
      exerciseKey: String(row.exercise_key),
      reflection: row.reflection as string | null,
    }));
}

export function getNextTrainingDay(maxDay = 14): number {
  if (isWebRuntime()) {
    const completed = new Set(readWebDatabase().trainingProgress.map((record) => record.day));
    for (let day = 1; day <= maxDay; day += 1) {
      if (!completed.has(day)) {
        return day;
      }
    }
    return maxDay + 1;
  }

  const rows = getDb().getAllSync<{ day: number }>("SELECT DISTINCT day FROM training_progress WHERE day <= ?", maxDay);
  const completed = new Set(rows.map((row) => row.day));
  for (let day = 1; day <= maxDay; day += 1) {
    if (!completed.has(day)) {
      return day;
    }
  }
  return maxDay + 1;
}

export function clearAllData(): void {
  if (isWebRuntime()) {
    writeWebDatabase({ crisisSessions: [], dailyCheckIns: [], trainingProgress: [] });
    return;
  }

  getDb().execSync("DELETE FROM crisis_sessions; DELETE FROM daily_check_ins; DELETE FROM training_progress; UPDATE user_meta SET current_streak = 0, longest_streak = 0, last_active_date = NULL;");
}
