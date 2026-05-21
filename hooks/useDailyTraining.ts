import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { foundationTrainingDays, getExerciseForDay } from "@/modules/cbt/curriculum";
import { getNextTrainingDay } from "@/modules/db/queries";

export function useDailyTraining() {
  const [day, setDay] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setDay(getNextTrainingDay(foundationTrainingDays));
    }, []),
  );

  const foundationComplete = day > foundationTrainingDays;

  return {
    day,
    exercise: getExerciseForDay(Math.min(day, foundationTrainingDays)),
    foundationComplete,
  };
}
