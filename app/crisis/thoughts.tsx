import { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CalmTextInput } from "@/components/shared/CalmTextInput";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { DistortionTag } from "@/components/crisis/DistortionTag";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { analyseDistortions } from "@/modules/ai/distortionAnalysis";
import { DistortionKey, distortionDefinitions } from "@/constants/distortions";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function ThoughtsScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patternNote, setPatternNote] = useState("");

  async function findPatterns() {
    if (session.automaticThoughts.trim().length < 3) {
      setError("Write the thought first, then ClearPath can look for patterns.");
      return;
    }
    setError("");
    setPatternNote("");
    setLoading(true);
    const matches = await analyseDistortions(session.automaticThoughts);
    updateSession({ distortions: matches.map((match) => match.distortion) });
    if (matches.length === 0) {
      setPatternNote("No clear pattern was found automatically. You can choose one below if it fits, or keep going without a label.");
    } else {
      setPatternNote("These are optional labels. Keep any that fit and remove any that do not.");
    }
    setLoading(false);
  }

  function continueFlow() {
    if (session.automaticThoughts.trim().length < 3) {
      setError("Write the automatic thought before continuing.");
      return;
    }
    setError("");
    goToStep("challenge");
  }

  function toggle(distortion: DistortionKey) {
    const active = session.distortions.includes(distortion);
    updateSession({ distortions: active ? session.distortions.filter((item) => item !== distortion) : [...session.distortions, distortion] });
  }

  return (
    <Screen>
      <CrisisStepHeader step={5} total={8} backTo="/crisis/feelings" />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">What did your mind say?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Write the automatic thought as it showed up.</Text>
      <CalmTextInput
        accessibilityLabel="Automatic thoughts"
        accessibilityHint="Write the thought that came up quickly."
        className="mt-6 min-h-[180px] p-5 font-mono leading-7"
        multiline
        placeholder="They ignored me because I did something wrong."
        value={session.automaticThoughts}
        onChangeText={(automaticThoughts) => {
          updateSession({ automaticThoughts });
          if (automaticThoughts.trim().length >= 3) {
            setError("");
          }
          setPatternNote("");
        }}
      />
      {error ? <Text className="mt-3 font-bodyMed text-sm text-crisis-text">{error}</Text> : null}
      <CalmButton label={loading ? "Looking gently..." : "Find thinking patterns"} variant="subtle" className="mt-4" onPress={findPatterns} />
      {patternNote ? <Text className="mt-3 font-body text-sm leading-6 text-text-secondary">{patternNote}</Text> : null}
      {patternNote || session.distortions.length > 0 ? (
        <View className="mt-4 flex-row flex-wrap gap-2">
          {(session.distortions.length > 0 ? session.distortions : (Object.keys(distortionDefinitions).slice(0, 6) as DistortionKey[])).map((distortion) => (
            <DistortionTag key={distortion} distortion={distortion} selected={session.distortions.includes(distortion)} onPress={() => toggle(distortion)} />
          ))}
        </View>
      ) : null}
      <CalmButton label="Continue" className="mt-6 bg-accent" onPress={continueFlow} />
    </Screen>
  );
}
