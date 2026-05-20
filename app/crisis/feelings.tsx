import { useState } from "react";
import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { EmotionPicker } from "@/components/crisis/EmotionPicker";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function FeelingsScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [error, setError] = useState("");

  function continueFlow() {
    if (session.emotions.length === 0) {
      setError("Choose at least one feeling before continuing.");
      return;
    }
    setError("");
    goToStep("thoughts");
  }

  return (
    <Screen>
      <CrisisStepHeader step={4} total={8} backTo="/crisis/situation" />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What feelings are here?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Choose one to five feelings and set how strong each one feels.</Text>
      <EmotionPicker
        selected={session.emotions}
        onChange={(emotions) => {
          updateSession({ emotions });
          if (emotions.length > 0) {
            setError("");
          }
        }}
      />
      {error ? <Text className="mt-3 font-bodyMed text-sm text-crisis-text">{error}</Text> : null}
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={continueFlow} />
    </Screen>
  );
}
