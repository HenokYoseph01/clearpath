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
  // Basic MVP: local-only template suggestion. No API key or network call.
  return templateBalancedThought(args.situation, args.automaticThought, args.evidenceAgainst);
}
