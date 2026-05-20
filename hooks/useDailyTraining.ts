import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { getExerciseForDay } from "@/modules/cbt/curriculum";
import { getNextTrainingDay } from "@/modules/db/queries";

export function useDailyTraining() {
  const [day, setDay] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setDay(getNextTrainingDay());
    }, []),
  );

  return {
    day,
    exercise: getExerciseForDay(day),
  };
}
