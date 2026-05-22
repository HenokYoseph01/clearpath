import { useLocalSearchParams, router } from "expo-router";
import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { foundationTrainingDays, getExerciseForDay } from "@/modules/cbt/curriculum";
import { completeTrainingDay, getNextTrainingDay, listTrainingProgress } from "@/modules/db/queries";
import { useUserStore } from "@/store/userStore";

export default function TrainingDayScreen() {
  const params = useLocalSearchParams<{ day: string }>();
  const day = Number(params.day ?? 1);
  const exercise = useMemo(() => getExerciseForDay(day), [day]);
  const [reflection, setReflection] = useState("");
  const recordActivity = useUserStore((state) => state.recordActivity);
  const nextDay = getNextTrainingDay(foundationTrainingDays);
  const completedRecord = listTrainingProgress().find((record) => record.day === day);
  const completed = !!completedRecord;
  const locked = day > nextDay || day < 1 || day > foundationTrainingDays;

  function complete() {
    if (completed || locked) {
      router.replace("/train");
      return;
    }
    completeTrainingDay(day, exercise.key, reflection);
    recordActivity(new Date().toISOString().slice(0, 10));
    router.replace("/train");
  }

  if (completed) {
    return (
      <Screen>
        <Text className="font-body text-sm text-text-tertiary">Practice {day} · completed</Text>
        <Text className="mt-2 font-display text-4xl text-text-primary">{exercise.title}</Text>
        <Text className="mt-4 font-body text-base leading-7 text-text-secondary">
          This is a read-only review of what you wrote. Looking back can help you notice old habits, repeated themes, and ways your thinking is shifting.
        </Text>
        <View className="mt-6 rounded-calm bg-bg-surface p-5">
          <Text className="font-display text-2xl text-text-primary">Practice prompt</Text>
          <Text className="mt-3 font-body text-base leading-7 text-text-secondary">{exercise.prompt}</Text>
        </View>
        <View className="mt-4 rounded-calm bg-calm p-5">
          <Text className="font-display text-2xl text-text-primary">What you wrote</Text>
          <Text className="mt-3 font-mono text-base leading-7 text-text-primary">
            {completedRecord?.reflection?.trim() || "No reflection was written for this practice."}
          </Text>
        </View>
        <CalmButton label="Back to training" className="mt-6 bg-accent" onPress={() => router.replace("/train")} />
      </Screen>
    );
  }

  if (locked) {
    const lockMessage =
      nextDay > foundationTrainingDays
        ? "The 14-practice foundation is complete. New maintenance practices are not open yet."
        : `Complete Practice ${nextDay} first. Each practice builds on the one before it.`;

    return (
      <Screen>
        <Text className="font-display text-4xl text-text-primary">Practice locked</Text>
        <Text className="mt-4 font-body text-base leading-7 text-text-secondary">{lockMessage}</Text>
        <CalmButton label="Back to training" className="mt-6 bg-accent" onPress={() => router.replace("/train")} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text className="font-body text-sm text-text-tertiary">Day {day} · {exercise.estimate}</Text>
      <Text className="mt-2 font-display text-4xl text-text-primary">{exercise.title}</Text>
      <Text className="mt-3 font-bodyMed text-base text-text-primary">{exercise.goal}</Text>
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
