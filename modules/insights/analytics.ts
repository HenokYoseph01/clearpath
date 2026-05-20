import { CrisisSessionRecord, DailyCheckInRecord } from "@/modules/db/queries";

export function getMoodTrend(checkIns: DailyCheckInRecord[]): { label: string; value: number }[] {
  return checkIns
    .slice(0, 14)
    .reverse()
    .map((checkIn) => ({ label: checkIn.date.slice(5), value: checkIn.moodScore }));
}

export function getMostCommonDistortions(sessions: CrisisSessionRecord[]): string[] {
  const counts = new Map<string, number>();
  sessions.forEach((session) => {
    session.distortions.forEach((distortion) => counts.set(distortion, (counts.get(distortion) ?? 0) + 1));
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);
}

export function summarizeRecentShift(sessions: CrisisSessionRecord[]): string {
  const recent = sessions[0];
  if (!recent || recent.emotions.length === 0) {
    return "Your insights will appear here after a few reflections.";
  }

  const shifted = recent.emotions.filter((emotion) => typeof emotion.intensityAfter === "number");
  if (shifted.length === 0) {
    return "Your latest reflection is saved for when you want to revisit it.";
  }

  const summary = shifted
    .map((emotion) => `${emotion.label} ${emotion.intensityBefore}% -> ${emotion.intensityAfter}%`)
    .join(", ");
  return `Latest feeling shifts: ${summary}.`;
}
