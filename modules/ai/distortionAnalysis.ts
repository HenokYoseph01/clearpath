import { detectDistortions, DistortionMatch } from "@/modules/cbt/distortions";

export async function analyseDistortions(thought: string): Promise<DistortionMatch[]> {
  // Basic MVP: keep this local-only. The AI implementation can be restored later
  // from modules/ai/client.ts when we decide to expose API-key settings again.
  return detectDistortions(thought);
}
