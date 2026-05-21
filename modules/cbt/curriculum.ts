export type ExerciseKind = "reading" | "reflection" | "thoughtRecord" | "activation" | "defusion" | "quiz" | "weeklyReview";

export type TrainingExercise = {
  day: number;
  key: string;
  title: string;
  estimate: string;
  kind: ExerciseKind;
  goal: string;
  prompt: string;
};

export const foundationTrainingDays = 14;

export const curriculum: TrainingExercise[] = [
  {
    day: 1,
    key: "cbt-triangle",
    title: "Thoughts, feelings, actions",
    estimate: "~5 min",
    kind: "reading",
    goal: "Learn the basic CBT loop.",
    prompt: "Notice how one thought can change how your body feels and what you do next. Think of one small moment today and name the situation, the feeling, and the action urge.",
  },
  {
    day: 2,
    key: "automatic-thoughts",
    title: "Catch one quick thought",
    estimate: "~6 min",
    kind: "reflection",
    goal: "Practice noticing thoughts before fixing them.",
    prompt: "Write one thought that showed up quickly today. No need to argue with it yet. Just catch the exact words your mind used.",
  },
  {
    day: 3,
    key: "thinking-patterns",
    title: "Spot thinking patterns",
    estimate: "~6 min",
    kind: "quiz",
    goal: "Build a label for common stress patterns.",
    prompt: "Practice naming a few common patterns your mind might use under stress, such as mind reading, catastrophizing, all-or-nothing thinking, or discounting the positive.",
  },
  {
    day: 4,
    key: "first-record",
    title: "A small thought record",
    estimate: "~7 min",
    kind: "thoughtRecord",
    goal: "Separate facts from interpretations.",
    prompt: "Choose a small situation. Write what happened, then write what your mind said it meant. Keep the facts and the interpretation in separate lines.",
  },
  {
    day: 5,
    key: "evidence-check",
    title: "Check the evidence",
    estimate: "~7 min",
    kind: "thoughtRecord",
    goal: "Test a thought without forcing positivity.",
    prompt: "Pick one thought from today. Write one piece of evidence that supports it and one piece of evidence that does not fully fit it.",
  },
  {
    day: 6,
    key: "balanced-thought",
    title: "Build a balanced thought",
    estimate: "~7 min",
    kind: "thoughtRecord",
    goal: "Create a kinder, more accurate replacement thought.",
    prompt: "Use this shape: 'This is hard, and...' Finish the sentence with something realistic, specific, and not overly positive.",
  },
  {
    day: 7,
    key: "weekly-review-1",
    title: "Look back with care",
    estimate: "~6 min",
    kind: "weeklyReview",
    goal: "Notice repetition without judging it.",
    prompt: "Look back over the week. What is one thought pattern that appeared more than once? What helped even a little?",
  },
  {
    day: 8,
    key: "body-cues",
    title: "Notice body cues",
    estimate: "~5 min",
    kind: "reflection",
    goal: "Catch distress earlier through physical signals.",
    prompt: "Think of a moment when stress rose. Where did you feel it in your body first? Name the cue and what it usually asks you to do.",
  },
  {
    day: 9,
    key: "behavioral-activation",
    title: "One meaningful action",
    estimate: "~5 min",
    kind: "activation",
    goal: "Use action to influence mood gently.",
    prompt: "Choose one small action that supports the kind of day you want. Keep it tiny enough to complete even if motivation is low.",
  },
  {
    day: 10,
    key: "problem-solving",
    title: "What is controllable?",
    estimate: "~6 min",
    kind: "reflection",
    goal: "Sort worries into controllable and not controllable.",
    prompt: "Write one worry. List one part you can influence today and one part that may need to be released, postponed, or accepted for now.",
  },
  {
    day: 11,
    key: "defusion",
    title: "Make room around a thought",
    estimate: "~5 min",
    kind: "defusion",
    goal: "Treat thoughts as mental events, not commands.",
    prompt: "Practice seeing a thought as something your mind produced. Put the phrase 'I am having the thought that...' before it and notice whether the thought has a little more space around it.",
  },
  {
    day: 12,
    key: "self-compassion",
    title: "Answer like a steady friend",
    estimate: "~6 min",
    kind: "reflection",
    goal: "Lower self-criticism while staying honest.",
    prompt: "Write one hard thought. Then answer it the way you would answer someone you care about: warm, direct, and realistic.",
  },
  {
    day: 13,
    key: "coping-plan",
    title: "Make a small support plan",
    estimate: "~7 min",
    kind: "activation",
    goal: "Prepare one next step before distress spikes.",
    prompt: "Choose one signal that means you are getting overwhelmed, one grounding step, one person or place that feels safer, and one task you can postpone.",
  },
  {
    day: 14,
    key: "weekly-review-2",
    title: "Two-week reflection",
    estimate: "~8 min",
    kind: "weeklyReview",
    goal: "See what changed through practice.",
    prompt: "Look back at the past two weeks. What thought do you catch faster now? What feeling is easier to name? What skill do you want to keep practicing?",
  },
];

export function getExerciseForDay(day: number): TrainingExercise {
  return curriculum[Math.max(0, Math.min(day - 1, curriculum.length - 1))];
}
