import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { DistortionTag } from "@/components/crisis/DistortionTag";
import { analyseDistortions } from "@/modules/ai/distortionAnalysis";
import { DistortionKey } from "@/constants/distortions";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function ThoughtsScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [loading, setLoading] = useState(false);

  async function findPatterns() {
    setLoading(true);
    const matches = await analyseDistortions(session.automaticThoughts);
    updateSession({ distortions: matches.map((match) => match.distortion) });
    setLoading(false);
  }

  function toggle(distortion: DistortionKey) {
    const active = session.distortions.includes(distortion);
    updateSession({ distortions: active ? session.distortions.filter((item) => item !== distortion) : [...session.distortions, distortion] });
  }

  return (
    <Screen>
      <ProgressBar step={5} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What did your mind say?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Write the automatic thought as it showed up.</Text>
      <TextInput
        accessibilityLabel="Automatic thoughts"
        accessibilityHint="Write the thought that came up quickly."
        className="mt-6 min-h-[180px] rounded-calm bg-bg-subtle p-5 font-mono text-base leading-7 text-text-primary"
        multiline
        placeholder="They ignored me because I did something wrong."
        value={session.automaticThoughts}
        onChangeText={(automaticThoughts) => updateSession({ automaticThoughts })}
      />
      <CalmButton label={loading ? "Looking gently..." : "Find thinking patterns"} variant="subtle" className="mt-4" onPress={findPatterns} />
      <View className="mt-4 flex-row flex-wrap gap-2">
        {session.distortions.map((distortion) => (
          <DistortionTag key={distortion} distortion={distortion} selected onPress={() => toggle(distortion)} />
        ))}
      </View>
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={() => goToStep("challenge")} />
    </Screen>
  );
}
