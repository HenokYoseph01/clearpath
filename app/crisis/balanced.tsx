import { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CalmTextInput } from "@/components/shared/CalmTextInput";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { getBalancedThoughtStarters } from "@/modules/cbt/balancedThoughtStarters";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function BalancedScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [error, setError] = useState("");

  const starters = getBalancedThoughtStarters({
    situation: session.situation,
    automaticThought: session.automaticThoughts,
    evidenceFor: session.evidenceFor,
    evidenceAgainst: session.evidenceAgainst,
    friendPerspective: session.friendPerspective,
  });

  function applyStarter(thought: string) {
    updateSession({ balancedThought: thought });
    setError("");
  }

  function continueFlow() {
    if (session.balancedThought.trim().length < 3) {
      setError("Write or choose a balanced thought before continuing.");
      return;
    }
    setError("");
    updateSession({
      emotions: session.emotions.map((emotion) => ({
        ...emotion,
        intensityAfter: emotion.intensityAfter ?? emotion.intensityBefore,
      })),
    });
    goToStep("rerate");
  }

  return (
    <Screen>
      <CrisisStepHeader step={7} total={8} backTo="/crisis/challenge" />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What is a more balanced view?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">
        Pick a starting point or write your own. A balanced thought should be realistic, not forced-positive.
      </Text>
      <View className="mt-5 gap-3">
        {starters.map((starter) => (
          <CalmButton
            key={starter.key}
            label={starter.title}
            variant="subtle"
            className="items-start bg-bg-surface"
            onPress={() => applyStarter(starter.thought)}
          >
            <Text className="font-bodyMed text-base text-text-primary">{starter.title}</Text>
            <Text className="mt-1 font-body text-sm leading-6 text-text-secondary">{starter.thought}</Text>
          </CalmButton>
        ))}
      </View>
      <CalmTextInput
        accessibilityLabel="Balanced thought"
        accessibilityHint="Write or edit a balanced thought."
        className="mt-5 min-h-[180px] p-5 font-mono leading-7"
        multiline
        placeholder="One way to look at this is..."
        value={session.balancedThought}
        onChangeText={(balancedThought) => {
          updateSession({ balancedThought });
          if (balancedThought.trim().length >= 3) {
            setError("");
          }
        }}
      />
      {error ? <Text className="mt-3 font-bodyMed text-sm text-crisis-text">{error}</Text> : null}
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={continueFlow} />
    </Screen>
  );
}
