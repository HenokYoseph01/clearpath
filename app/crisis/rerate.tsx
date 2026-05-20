import { useState } from "react";
import { router } from "expo-router";
import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { EmotionPicker } from "@/components/crisis/EmotionPicker";
import { MoodShift } from "@/components/crisis/MoodShift";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { saveCrisisSession } from "@/modules/db/queries";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function RerateScreen() {
  const { session, updateSession, resetSession } = useCrisisSession();
  const [error, setError] = useState("");

  function saveAndExit() {
    const missingRerate = session.emotions.some((emotion) => typeof emotion.intensityAfter !== "number");
    if (missingRerate) {
      setError("Re-rate each feeling before saving.");
      return;
    }
    saveCrisisSession({
      situation: session.situation,
      emotions: session.emotions,
      automaticThoughts: session.automaticThoughts,
      distortions: session.distortions,
      evidenceFor: session.evidenceFor,
      evidenceAgainst: session.evidenceAgainst,
      friendPerspective: session.friendPerspective,
      balancedThought: session.balancedThought,
      distressStart: session.distressStart,
      distressEnd: session.distressEnd,
    });
    resetSession();
    router.replace("/journal");
  }

  return (
    <Screen>
      <CrisisStepHeader step={8} total={8} backTo="/crisis/balanced" />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">How intense are those feelings now?</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">
        Re-rate only the feelings you picked earlier. If something is stronger, ClearPath will still save it without judgment.
      </Text>
      <EmotionPicker
        selected={session.emotions}
        onChange={(emotions) => {
          updateSession({ emotions });
          setError("");
        }}
        mode="after"
        lockedLabels
      />
      <MoodShift emotions={session.emotions} />
      <Text className="mt-6 font-display text-3xl text-text-primary">You did the work. That shift matters.</Text>
      {error ? <Text className="mt-3 font-bodyMed text-sm text-crisis-text">{error}</Text> : null}
      <CalmButton label="Save and close" className="mt-6 bg-accent" onPress={saveAndExit} />
    </Screen>
  );
}
