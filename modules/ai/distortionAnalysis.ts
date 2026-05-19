import { DistortionKey, distortionDefinitions } from "@/constants/distortions";
import { detectDistortions, DistortionMatch } from "@/modules/cbt/distortions";
import { callAnthropicJson, getAnthropicApiKey } from "./client";

type AiDistortion = {
  distortion: DistortionKey;
  explanation: string;
  confidence: "high" | "medium";
};

export async function analyseDistortions(thought: string): Promise<DistortionMatch[]> {
  const fallback = detectDistortions(thought);
  const apiKey = await getAnthropicApiKey();
  if (!apiKey) {
    return fallback;
  }

  try {
    const result = await callAnthropicJson<AiDistortion[]>(
      apiKey,
      "You are a CBT-informed wellness assistant. Return only a JSON array. Use warm, non-judgmental wording. Do not diagnose.",
      `Identify likely thinking patterns in this automatic thought. Allowed keys: ${Object.keys(distortionDefinitions).join(", ")}.\nThought: ${thought}`,
      500,
    );
    return result
      .filter((item) => item.distortion in distortionDefinitions)
      .map((item) => ({
        ...item,
        title: distortionDefinitions[item.distortion].title,
      }));
  } catch {
    return fallback;
  }
}
