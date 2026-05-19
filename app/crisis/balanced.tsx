import { useState } from "react";
import { Text, TextInput } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { suggestBalancedThought } from "@/modules/ai/balancedThought";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function BalancedScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [loading, setLoading] = useState(false);

  async function suggest() {
    setLoading(true);
    const balancedThought = await suggestBalancedThought({
      situation: session.situation,
      automaticThought: session.automaticThoughts,
      evidenceFor: session.evidenceFor,
      evidenceAgainst: session.evidenceAgainst,
    });
    updateSession({ balancedThought });
    setLoading(false);
  }

  return (
    <Screen>
      <ProgressBar step={7} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What is a more balanced view?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Make it realistic and kind enough to return to later.</Text>
      <CalmButton label={loading ? "Preparing a suggestion..." : "Suggest a starting point"} variant="subtle" className="mt-5" onPress={suggest} />
      <TextInput
        accessibilityLabel="Balanced thought"
        accessibilityHint="Write or edit a balanced thought."
        className="mt-5 min-h-[180px] rounded-calm bg-bg-subtle p-5 font-mono text-base leading-7 text-text-primary"
        multiline
        placeholder="One way to look at this is..."
        value={session.balancedThought}
        onChangeText={(balancedThought) => updateSession({ balancedThought })}
      />
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={() => goToStep("rerate")} />
    </Screen>
  );
}
