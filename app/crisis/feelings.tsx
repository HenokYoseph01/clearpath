import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { EmotionPicker } from "@/components/crisis/EmotionPicker";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function FeelingsScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();

  return (
    <Screen>
      <ProgressBar step={4} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What feelings are here?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Choose one to five feelings and set how strong each one feels.</Text>
      <EmotionPicker selected={session.emotions} onChange={(emotions) => updateSession({ emotions })} />
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={() => goToStep("thoughts")} />
    </Screen>
  );
}
