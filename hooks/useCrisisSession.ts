import { Href, router } from "expo-router";
import { CrisisStep, useCrisisStore } from "@/store/crisisStore";

const routeByStep: Record<CrisisStep, Href> = {
  triage: "/crisis/triage",
  grounding: "/crisis/grounding",
  situation: "/crisis/situation",
  feelings: "/crisis/feelings",
  thoughts: "/crisis/thoughts",
  challenge: "/crisis/challenge",
  balanced: "/crisis/balanced",
  rerate: "/crisis/rerate",
};

export function useCrisisSession() {
  const { session, setStep, updateSession, resetSession } = useCrisisStore();

  function goToStep(step: CrisisStep) {
    setStep(step);
    router.push(routeByStep[step]);
  }

  return { session, updateSession, resetSession, goToStep };
}
