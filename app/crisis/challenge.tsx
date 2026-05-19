import { Text, TextInput } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { socraticPrompts } from "@/modules/cbt/socratic";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function ChallengeScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();

  return (
    <Screen>
      <ProgressBar step={6} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">Let us look at the thought from a few angles.</Text>
      {socraticPrompts.map((prompt) => (
        <TextInput
          key={prompt.key}
          accessibilityLabel={prompt.title}
          accessibilityHint={prompt.helper}
          className="mt-5 min-h-[120px] rounded-calm bg-bg-subtle p-5 font-mono text-base leading-7 text-text-primary"
          multiline
          placeholder={prompt.title}
          value={session[prompt.key]}
          onChangeText={(value) => updateSession({ [prompt.key]: value })}
        />
      ))}
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={() => goToStep("balanced")} />
    </Screen>
  );
}
