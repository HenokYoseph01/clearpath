import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function TriageScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();

  function continueFlow(score: number) {
    updateSession({ distressStart: score, step: score >= 5 ? "grounding" : "situation" });
    goToStep(score >= 5 ? "grounding" : "situation");
  }

  return (
    <Screen>
      <ProgressBar step={1} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">Before we start, how distressed are you right now?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Choose the closest number. This helps ClearPath offer the right pace.</Text>
      <View className="mt-6 flex-row flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
          <CalmButton key={score} label={`${score}`} variant={session.distressStart === score ? "primary" : "subtle"} onPress={() => continueFlow(score)} className="h-[58px] w-[58px] px-0">
            <Text className={`font-bodyMed text-xl ${session.distressStart === score ? "text-white" : "text-text-primary"}`}>{score}</Text>
          </CalmButton>
        ))}
      </View>
    </Screen>
  );
}
