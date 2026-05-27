import { useState } from "react";
import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CalmTextInput } from "@/components/shared/CalmTextInput";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { socraticPrompts } from "@/modules/cbt/socratic";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function ChallengeScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [error, setError] = useState("");

  function continueFlow() {
    if (!session.evidenceFor.trim() || !session.evidenceAgainst.trim() || !session.friendPerspective.trim()) {
      setError("Answer each prompt with a few words before continuing.");
      return;
    }
    setError("");
    goToStep("balanced");
  }

  return (
    <Screen>
      <CrisisStepHeader step={6} total={8} backTo="/crisis/thoughts" />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">Let us look at the thought from a few angles.</Text>
      {socraticPrompts.map((prompt) => (
        <CalmTextInput
          key={prompt.key}
          accessibilityLabel={prompt.title}
          accessibilityHint={prompt.helper}
          className="mt-5 min-h-[120px] p-5 font-mono leading-7"
          multiline
          placeholder={prompt.title}
          value={session[prompt.key]}
          onChangeText={(value) => {
            updateSession({ [prompt.key]: value });
            setError("");
          }}
        />
      ))}
      {error ? <Text className="mt-3 font-bodyMed text-sm text-crisis-text">{error}</Text> : null}
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={continueFlow} />
    </Screen>
  );
}
