import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { JournalCard } from "@/components/shared/JournalCard";
import { listCrisisSessions, CrisisSessionRecord } from "@/modules/db/queries";
import { getMostCommonDistortions, summarizeRecentShift } from "@/modules/insights/analytics";

export default function JournalTab() {
  const [entries, setEntries] = useState<CrisisSessionRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      setEntries(listCrisisSessions());
    }, []),
  );

  const common = getMostCommonDistortions(entries);

  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Journal</Text>
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-bodyMed text-base text-text-primary">{summarizeRecentShift(entries)}</Text>
        {common.length ? <Text className="mt-2 font-body text-sm text-text-secondary">Common patterns: {common.join(", ")}</Text> : null}
      </View>
      <View className="mt-6">
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
