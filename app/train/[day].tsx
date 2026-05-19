import { useLocalSearchParams, router } from "expo-router";
import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { getExerciseForDay } from "@/modules/cbt/curriculum";
import { completeTrainingDay } from "@/modules/db/queries";
import { useUserStore } from "@/store/userStore";

export default function TrainingDayScreen() {
  const params = useLocalSearchParams<{ day: string }>();
  const day = Number(params.day ?? 1);
  const exercise = useMemo(() => getExerciseForDay(day), [day]);
  const [reflection, setReflection] = useState("");
  const recordActivity = useUserStore((state) => state.recordActivity);

  function complete() {
    completeTrainingDay(day, exercise.key, reflection);
    recordActivity(new Date().toISOString().slice(0, 10));
    router.back();
  }

  return (
    <Screen>
      <Text className="font-body text-sm text-text-tertiary">Day {day} · {exercise.estimate}</Text>
      <Text className="mt-2 font-display text-4xl text-text-primary">{exercise.title}</Text>
      <Text className="mt-4 font-body text-base leading-7 text-text-secondary">{exercise.prompt}</Text>

      {exercise.kind === "defusion" ? (
        <View className="mt-6 rounded-calm bg-bg-surface p-5">
          <Text className="font-display text-2xl text-text-primary">Try these phrases slowly.</Text>
          <Text className="mt-4 font-body text-base leading-8 text-text-secondary">I am having the thought that...</Text>
          <Text className="font-body text-base leading-8 text-text-secondary">I notice my mind is telling me that...</Text>
          <Text className="font-body text-base leading-8 text-text-secondary">My mind has produced the story that...</Text>
        </View>
      ) : null}

      {exercise.kind === "activation" ? (
        <View className="mt-6 rounded-calm bg-bg-surface p-5">
          <Text className="font-display text-2xl text-text-primary">Choose one small action.</Text>
          <Text className="mt-3 font-body text-base leading-7 text-text-secondary">A short walk, a glass of water, a text to someone safe, or five quiet breaths all count.</Text>
        </View>
      ) : null}

      <TextInput
        accessibilityLabel="Training reflection"
        accessibilityHint="Write a short reflection for this practice."
        className="mt-6 min-h-[180px] rounded-calm bg-bg-subtle p-5 font-mono text-base leading-7 text-text-primary"
        multiline
        placeholder="What did you notice?"
        value={reflection}
        onChangeText={setReflection}
      />
      <CalmButton label="Complete practice" className="mt-6 bg-accent" onPress={complete} />
    </Screen>
  );
}
