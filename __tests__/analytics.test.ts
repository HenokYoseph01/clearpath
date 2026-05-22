import { getMostCommonDistortions, getMoodTrend } from "@/modules/insights/analytics";

describe("analytics", () => {
  it("returns mood points in chronological order", () => {
    const trend = getMoodTrend([
      { id: 2, date: "2026-05-19", createdAt: 2, moodLabel: "Calm", moodScore: 8, energy: "Medium" },
      { id: 1, date: "2026-05-18", createdAt: 1, moodLabel: "Sad", moodScore: 3, energy: "Low" },
    ]);
    expect(trend).toEqual([
      { key: "1", label: "05-18", value: 3 },
      { key: "2", label: "05-19", value: 8 },
    ]);
  });

  it("keeps same-day mood points uniquely keyed", () => {
    const trend = getMoodTrend([
      { id: 3, date: "2026-05-22", createdAt: 3, moodLabel: "Calm", moodScore: 8, energy: "Medium" },
      { id: 2, date: "2026-05-22", createdAt: 2, moodLabel: "Anxious", moodScore: 3, energy: "Low" },
    ]);

    expect(trend.map((point) => point.label)).toEqual(["05-22", "05-22"]);
    expect(new Set(trend.map((point) => point.key)).size).toBe(2);
  });

  it("counts common thinking patterns", () => {
    const common = getMostCommonDistortions([
      { id: 1, createdAt: 1, situation: "", emotions: [], automaticThoughts: "", distortions: ["mindReading"], distressStart: 4, completed: true },
      { id: 2, createdAt: 2, situation: "", emotions: [], automaticThoughts: "", distortions: ["mindReading", "labelling"], distressStart: 4, completed: true },
    ]);
    expect(common[0]).toBe("mindReading");
  });
});
