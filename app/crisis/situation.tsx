import { Text, TextInput } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function SituationScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();

  return (
    <Screen>
      <ProgressBar step={3} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What happened?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Just the facts, as if a camera recorded it.</Text>
      <TextInput
        accessibilityLabel="Situation"
        accessibilityHint="Describe the facts of what happened."
        className="mt-6 min-h-[160px] rounded-calm bg-bg-subtle p-5 font-mono text-base leading-7 text-text-primary"
        multiline
        maxLength={300}
        placeholder="My boss did not reply to my email."
        value={session.situation}
        onChangeText={(situation) => updateSession({ situation })}
      />
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={() => goToStep("feelings")} />
    </Screen>
  );
}
