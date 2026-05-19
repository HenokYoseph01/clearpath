import { DistortionKey, distortionDefinitions } from "@/constants/distortions";

export type DistortionMatch = {
  distortion: DistortionKey;
  title: string;
  explanation: string;
  confidence: "high" | "medium";
};

export const distortionRules: Record<DistortionKey, RegExp[]> = {
  catastrophising: [/everything is ruined/i, /it's all over/i, /worst.*ever/i, /disaster/i, /can't handle/i],
  blackAndWhite: [/\balways\b/i, /\bnever\b/i, /\beveryone\b/i, /\bno one\b/i, /perfect/i, /failure/i],
  mindReading: [/they think/i, /must think/i, /they hate/i, /they're judging/i, /everyone knows/i],
  fortuneTelling: [/i know it will/i, /it's going to/i, /i'll definitely/i, /this will end/i, /i won't be able/i],
  personalisation: [/my fault/i, /because of me/i, /i caused/i, /i'm to blame/i, /i ruined/i],
  shouldStatements: [/i should/i, /i must/i, /i have to/i, /they should/i, /i ought to/i],
  emotionalReasoning: [/i feel.*therefore/i, /feel like.*must be/i, /i feel.*so/i],
  labelling: [/i'm a failure/i, /i'm an idiot/i, /i'm worthless/i, /i'm pathetic/i, /i'm useless/i],
  mentalFilter: [/the one bad/i, /only thing that matters/i, /can only focus on/i, /all i can think/i],
  discountingPositive: [/doesn't count/i, /doesn't matter/i, /just got lucky/i, /anyone could/i, /not a big deal/i],
};

export function detectDistortions(thought: string): DistortionMatch[] {
  const cleanThought = thought.trim();
  if (!cleanThought) {
    return [];
  }

  return Object.entries(distortionRules)
    .filter((entry): entry is [DistortionKey, RegExp[]] => entry[1].some((pattern) => pattern.test(cleanThought)))
    .map(([distortion]) => ({
      distortion,
      title: distortionDefinitions[distortion].title,
      explanation: `This may be ${distortionDefinitions[distortion].short.toLowerCase()}`,
      confidence: "medium",
    }));
}
