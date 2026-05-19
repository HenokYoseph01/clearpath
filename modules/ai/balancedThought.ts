import { getAnthropicApiKey, callAnthropicJson } from "./client";

type BalancedThoughtResponse = {
  thought: string;
};

export function templateBalancedThought(situation: string, automaticThought: string, evidenceAgainst: string): string {
  const context = situation.trim() ? `The situation is real: ${situation.trim()}.` : "This moment feels real and worth caring for.";
  const contrast = evidenceAgainst.trim() ? `There is also another side: ${evidenceAgainst.trim()}.` : "There may be details my mind cannot see right now.";
  const thought = automaticThought.trim() ? `The thought "${automaticThought.trim()}" is one possible story, not the only one.` : "This thought is one possible story, not the only one.";
  return `${context} ${thought} ${contrast}`;
}

export async function suggestBalancedThought(args: {
  situation: string;
  automaticThought: string;
  evidenceFor: string;
  evidenceAgainst: string;
}): Promise<string> {
  const apiKey = await getAnthropicApiKey();
  const fallback = templateBalancedThought(args.situation, args.automaticThought, args.evidenceAgainst);
  if (!apiKey) {
    return fallback;
  }

  try {
    const result = await callAnthropicJson<BalancedThoughtResponse>(
      apiKey,
      "Return only JSON with shape {\"thought\":\"...\"}. Write one warm, realistic, editable balanced thought. Do not diagnose.",
      JSON.stringify(args),
      220,
    );
    return result.thought.trim() || fallback;
  } catch {
    return fallback;
  }
}
