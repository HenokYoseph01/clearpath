export type Emotion = {
  label: string;
  family: "joy" | "trust" | "fear" | "surprise" | "sadness" | "anger" | "anticipation" | "calm";
  score: number;
};

export const emotions: Emotion[] = [
  { label: "Calm", family: "calm", score: 8 },
  { label: "Hopeful", family: "joy", score: 8 },
  { label: "Content", family: "joy", score: 8 },
  { label: "Grateful", family: "joy", score: 9 },
  { label: "Safe", family: "trust", score: 8 },
  { label: "Connected", family: "trust", score: 8 },
  { label: "Unsure", family: "surprise", score: 5 },
  { label: "Startled", family: "surprise", score: 4 },
  { label: "Anxious", family: "fear", score: 3 },
  { label: "Afraid", family: "fear", score: 2 },
  { label: "Overwhelmed", family: "fear", score: 2 },
  { label: "Ashamed", family: "sadness", score: 2 },
  { label: "Sad", family: "sadness", score: 3 },
  { label: "Lonely", family: "sadness", score: 3 },
  { label: "Tired", family: "sadness", score: 4 },
  { label: "Frustrated", family: "anger", score: 4 },
  { label: "Angry", family: "anger", score: 3 },
  { label: "Hurt", family: "anger", score: 3 },
  { label: "Restless", family: "anticipation", score: 5 },
  { label: "Motivated", family: "anticipation", score: 7 },
  { label: "Curious", family: "anticipation", score: 7 },
  { label: "Embarrassed", family: "sadness", score: 3 },
  { label: "Guilty", family: "sadness", score: 3 },
  { label: "Relieved", family: "calm", score: 8 },
];
