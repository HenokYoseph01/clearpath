import { router } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { curriculum } from "@/modules/cbt/curriculum";

export default function TrainingTab() {
  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Daily Training</Text>
      <Text className="mt-2 font-body text-base leading-7 text-text-secondary">Short practices for noticing thoughts, feelings, and actions with more room around them.</Text>
      <View className="mt-6">
        {curriculum.slice(0, 14).map((exercise) => (
          <CalmButton key={exercise.key} label={exercise.title} variant="subtle" className="mb-3 items-start" onPress={() => router.push(`/train/${exercise.day}`)}>
            <Text className="font-display text-xl text-text-primary">Day {exercise.day}: {exercise.title}</Text>
            <Text className="mt-1 font-body text-sm text-text-secondary">{exercise.estimate}</Text>
          </CalmButton>
        ))}
      </View>
    </Screen>
  );
}
