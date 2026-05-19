export type ExerciseKind = "reading" | "reflection" | "thoughtRecord" | "activation" | "defusion" | "quiz" | "weeklyReview";

export type TrainingExercise = {
  day: number;
  key: string;
  title: string;
  estimate: string;
  kind: ExerciseKind;
  prompt: string;
};

const foundations: TrainingExercise[] = [
  { day: 1, key: "cbt-triangle", title: "Thoughts, feelings, actions", estimate: "~5 min", kind: "reading", prompt: "Notice how one thought can change how your body feels and what you do next." },
  { day: 2, key: "automatic-thoughts", title: "Catch one quick thought", estimate: "~6 min", kind: "reflection", prompt: "Write one thought that showed up quickly today. No need to fix it yet." },
  { day: 3, key: "thinking-patterns", title: "Spot thinking patterns", estimate: "~6 min", kind: "quiz", prompt: "Practice naming a few common patterns your mind might use under stress." },
  { day: 4, key: "first-record", title: "A small thought record", estimate: "~7 min", kind: "thoughtRecord", prompt: "Separate what happened from what your mind said about it." },
  { day: 5, key: "activation", title: "One meaningful action", estimate: "~5 min", kind: "activation", prompt: "Choose one small action that supports the kind of day you want." },
  { day: 6, key: "defusion", title: "Make room around a thought", estimate: "~5 min", kind: "defusion", prompt: "Practice seeing a thought as something your mind produced, not a command." },
  { day: 7, key: "weekly-review-1", title: "Look back with care", estimate: "~6 min", kind: "weeklyReview", prompt: "Notice one pattern from the week without judging it." },
];

export const curriculum: TrainingExercise[] = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const base = foundations[index % foundations.length];
  if (day <= foundations.length) {
    return base;
  }
  return {
    ...base,
    day,
    key: `${base.key}-${day}`,
    title: day <= 14 ? base.title : `Practice day ${day}`,
    prompt: day <= 14 ? base.prompt : "Use one CBT skill on a real moment from today, then save a short reflection.",
  };
});

export function getExerciseForDay(day: number): TrainingExercise {
  return curriculum[Math.max(0, Math.min(day - 1, curriculum.length - 1))];
}
