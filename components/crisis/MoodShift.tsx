import { Text, View } from "react-native";
import { StoredEmotion } from "@/modules/db/queries";

type MoodShiftProps = {
  emotions: StoredEmotion[];
};

export function MoodShift({ emotions }: MoodShiftProps) {
  const increased = emotions.filter((emotion) => (emotion.intensityAfter ?? emotion.intensityBefore) > emotion.intensityBefore);
  const increasedLabels = increased.map((emotion) => emotion.label).join(", ");

  return (
    <View className="rounded-calm bg-bg-surface p-4">
      {emotions.map((emotion) => (
        <View key={emotion.label} className="mb-3">
          <Text className="font-bodyMed text-base text-text-primary">{emotion.label}</Text>
          <Text className="font-body text-sm text-text-secondary">
            {emotion.intensityBefore}% {"->"} {emotion.intensityAfter ?? emotion.intensityBefore}%
          </Text>
        </View>
      ))}
      {increased.length > 0 ? (
        <View className="mt-2 rounded-calm bg-accent-subtle p-4">
          <Text className="font-bodyMed text-base text-text-primary">
            {increasedLabels} {increased.length === 1 ? "is" : "are"} stronger right now.
          </Text>
          <Text className="mt-2 font-body text-sm leading-6 text-text-secondary">
            That can happen when you look directly at something hard. It does not mean this did not work. Before you close, try one grounding breath, lower the demand on yourself, and choose one small support step.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
