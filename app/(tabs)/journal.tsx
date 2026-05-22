import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { JournalCard } from "@/components/shared/JournalCard";
import { DailyCheckInRecord, listCrisisSessions, CrisisSessionRecord, listDailyCheckIns } from "@/modules/db/queries";
import { getMoodTrend, getMostCommonDistortions, summarizeRecentShift } from "@/modules/insights/analytics";

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
  const moodTrend = getMoodTrend(checkIns);
  const latestCheckIn = checkIns[0];

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
          </>
        ) : (
          <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
            Your mood and energy snapshots will appear here after you save a check-in.
          </Text>
        )}
        {moodTrend.length > 0 ? (
          <View className="mt-4">
            <Text className="font-bodyMed text-sm text-text-primary">14-day mood trend</Text>
            <View className="mt-3 flex-row items-end gap-2">
              {moodTrend.map((point) => (
                <View key={point.key} className="flex-1 items-center">
                  <View className="w-full rounded-full bg-accent-subtle" style={{ height: Math.max(8, point.value * 10) }} />
                  <Text className="mt-2 font-body text-xs text-text-tertiary">{point.label}</Text>
                </View>
              ))}
            </View>
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
