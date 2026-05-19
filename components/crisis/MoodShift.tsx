import { Text, View } from "react-native";
import { StoredEmotion } from "@/modules/db/queries";

type MoodShiftProps = {
  emotions: StoredEmotion[];
};

export function MoodShift({ emotions }: MoodShiftProps) {
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
    </View>
  );
}
