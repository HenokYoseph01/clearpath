import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { JournalCard } from "@/components/shared/JournalCard";
import { DailyCheckInRecord, listCrisisSessions, CrisisSessionRecord, listDailyCheckIns } from "@/modules/db/queries";
import { getMostCommonDistortions, summarizeRecentShift } from "@/modules/insights/analytics";

function formatCheckInDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}

export default function JournalTab() {
  const [entries, setEntries] = useState<CrisisSessionRecord[]>([]);
  const [checkIns, setCheckIns] = useState<DailyCheckInRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      setEntries(listCrisisSessions());
      setCheckIns(listDailyCheckIns(14));
    }, []),
  );

  const common = getMostCommonDistortions(entries);
  const latestCheckIn = checkIns[0];
  const recentCheckIns = checkIns.slice(0, 5);

  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Journal</Text>
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-bodyMed text-base text-text-primary">{summarizeRecentShift(entries)}</Text>
        {common.length ? <Text className="mt-2 font-body text-sm text-text-secondary">Common patterns: {common.join(", ")}</Text> : null}
      </View>

      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-2xl text-text-primary">Daily check-ins</Text>
        {latestCheckIn ? (
          <>
            <Text className="mt-2 font-bodyMed text-base text-text-primary">
              Latest: {latestCheckIn.moodLabel} mood, {latestCheckIn.energy.toLowerCase()} energy
            </Text>
            {latestCheckIn.note ? <Text className="mt-2 font-body text-sm leading-6 text-text-secondary">{latestCheckIn.note}</Text> : null}
            <Text className="mt-2 font-body text-sm text-text-tertiary">
              Recent check-ins are shown below as saved snapshots. They are not links.
            </Text>
          </>
        ) : (
          <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
            Your mood and energy snapshots will appear here after you save a check-in.
          </Text>
        )}
        {recentCheckIns.length > 0 ? (
          <View className="mt-4">
            <Text className="font-bodyMed text-sm text-text-primary">Recent mood snapshots</Text>
            {recentCheckIns.map((checkIn) => (
              <View key={checkIn.id} className="mt-3 rounded-calm bg-bg-subtle p-4">
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text className="font-bodyMed text-base text-text-primary">{checkIn.moodLabel}</Text>
                    <Text className="mt-1 font-body text-sm text-text-secondary">
                      {formatCheckInDate(checkIn.createdAt)} · {checkIn.energy} energy
                    </Text>
                  </View>
                  <Text className="font-bodyMed text-sm text-text-secondary">{checkIn.moodScore}/10</Text>
                </View>
                <View className="mt-3 h-2 overflow-hidden rounded-full bg-bg-muted">
                  <View className="h-full rounded-full bg-accent" style={{ width: `${checkIn.moodScore * 10}%` }} />
                </View>
                {checkIn.note ? <Text className="mt-3 font-body text-sm leading-6 text-text-secondary">{checkIn.note}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View className="mt-6">
        <Text className="mb-3 font-display text-2xl text-text-primary">Reflections</Text>
        {entries.length === 0 ? (
          <Text className="rounded-calm bg-bg-surface p-5 font-body text-base leading-7 text-text-secondary">
            Your journal is empty. Start a reflection and it will appear here.
          </Text>
        ) : (
          entries.map((entry) => <JournalCard key={entry.id} entry={entry} />)
        )}
      </View>
    </Screen>
  );
}
