import { getExerciseForDay } from "@/modules/cbt/curriculum";
import { useUserStore } from "@/store/userStore";

export function useDailyTraining() {
  const currentStreak = useUserStore((state) => state.currentStreak);
  const day = Math.min(currentStreak + 1, 30);
  return {
    day,
    exercise: getExerciseForDay(day),
  };
}
