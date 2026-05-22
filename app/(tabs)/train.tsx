import { router, useFocusEffect } from "expo-router";
import { CheckCircle2, LockKeyhole } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { curriculum, foundationTrainingDays } from "@/modules/cbt/curriculum";
import { getNextTrainingDay, listTrainingProgress, TrainingProgressRecord } from "@/modules/db/queries";

export default function TrainingTab() {
  const [progress, setProgress] = useState<TrainingProgressRecord[]>([]);
  const [nextDay, setNextDay] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setProgress(listTrainingProgress());
      setNextDay(getNextTrainingDay(foundationTrainingDays));
    }, []),
  );

  const completedDays = new Set(progress.map((item) => item.day));
  const foundationComplete = nextDay > foundationTrainingDays;

  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Daily Training</Text>
      <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
        A 14-practice foundation for catching thoughts earlier, naming patterns, and building more balanced responses through repetition.
      </Text>
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-bodyMed text-base text-text-primary">
          {foundationComplete ? "Foundation complete" : `Next up: Practice ${nextDay} of ${foundationTrainingDays}`}
        </Text>
        <Text className="mt-2 font-body text-sm leading-6 text-text-secondary">
          Completed practices stay highlighted and open as read-only reflections.
        </Text>
      </View>
      <View className="mt-6">
        {curriculum.slice(0, foundationTrainingDays).map((exercise) => {
          const completed = completedDays.has(exercise.day);
          const locked = exercise.day > nextDay;
          const current = exercise.day === nextDay;

          return (
            <CalmButton
              key={exercise.key}
              label={exercise.title}
              variant="subtle"
              disabled={locked}
              accessibilityState={{ disabled: locked, selected: current }}
              className={`mb-3 items-start ${completed ? "bg-calm" : locked ? "bg-bg-surface opacity-70" : "bg-accent-subtle"}`}
              onPress={() => router.push(`/train/${exercise.day}`)}
            >
              <View className="w-full flex-row items-start gap-3">
                {completed ? <CheckCircle2 color="hsl(214, 20%, 22%)" size={22} /> : locked ? <LockKeyhole color="hsl(212, 10%, 60%)" size={22} /> : null}
                <View className="flex-1">
                  <Text className="font-bodyMed text-xs text-text-tertiary">
                    {completed ? "Completed - tap to review" : locked ? "Locked" : "Open now"}
                  </Text>
                  <Text className="mt-1 font-display text-xl text-text-primary">Practice {exercise.day}: {exercise.title}</Text>
                  <Text className="mt-1 font-body text-sm text-text-secondary">{exercise.goal}</Text>
                  <Text className="mt-1 font-body text-xs text-text-tertiary">{exercise.estimate}</Text>
                </View>
              </View>
            </CalmButton>
          );
        })}
      </View>
    </Screen>
  );
}
