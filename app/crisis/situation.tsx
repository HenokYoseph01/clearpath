import { useState } from "react";
import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CalmTextInput } from "@/components/shared/CalmTextInput";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function SituationScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [error, setError] = useState("");

  function continueFlow() {
    if (session.situation.trim().length < 3) {
      setError("Add a few words about what happened before continuing.");
      return;
    }
    setError("");
    goToStep("feelings");
  }

  return (
    <Screen>
      <CrisisStepHeader step={3} total={8} backTo={session.distressStart >= 5 ? "/crisis/grounding" : "/crisis/triage"} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What happened?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Just the facts, as if a camera recorded it.</Text>
      <CalmTextInput
        accessibilityLabel="Situation"
        accessibilityHint="Describe the facts of what happened."
        className="mt-6 min-h-[160px] p-5 font-mono leading-7"
        multiline
        maxLength={300}
        placeholder="My boss did not reply to my email."
        value={session.situation}
        onChangeText={(situation) => {
          updateSession({ situation });
          if (situation.trim().length >= 3) {
            setError("");
          }
        }}
      />
      {error ? <Text className="mt-3 font-bodyMed text-sm text-crisis-text">{error}</Text> : null}
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={continueFlow} />
    </Screen>
  );
}
