import { useLocalSearchParams, router } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { getCrisisSession } from "@/modules/db/queries";
import { distortionDefinitions } from "@/constants/distortions";

export default function JournalEntryScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const entry = getCrisisSession(Number(params.id));

  if (!entry) {
    return (
      <Screen>
        <Text className="font-display text-3xl text-text-primary">Entry not found</Text>
        <CalmButton label="Back to journal" className="mt-6 bg-accent" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text className="font-body text-sm text-text-tertiary">{new Date(entry.createdAt).toLocaleString()}</Text>
      <Text className="mt-2 font-display text-4xl text-text-primary">Reflection</Text>
      <View className="mt-6 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-2xl text-text-primary">Situation</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">{entry.situation || "No situation added."}</Text>
      </View>
      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-2xl text-text-primary">Automatic thought</Text>
        <Text className="mt-2 font-mono text-base leading-7 text-text-primary">{entry.automaticThoughts || "No thought added."}</Text>
      </View>
      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-2xl text-text-primary">Patterns</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
          {entry.distortions.length ? entry.distortions.map((key) => distortionDefinitions[key].title).join(", ") : "No patterns selected."}
        </Text>
      </View>
      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-2xl text-text-primary">Balanced thought</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">{entry.balancedThought || "No balanced thought added."}</Text>
      </View>
      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-2xl text-text-primary">Feeling shift</Text>
        {entry.emotions.map((emotion) => (
          <Text key={emotion.label} className="mt-2 font-body text-base text-text-secondary">
            {emotion.label}: {emotion.intensityBefore}% {"->"} {emotion.intensityAfter ?? emotion.intensityBefore}%
          </Text>
        ))}
      </View>
    </Screen>
  );
}
