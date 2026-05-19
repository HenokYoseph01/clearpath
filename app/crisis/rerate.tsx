import { router } from "expo-router";
import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { EmotionPicker } from "@/components/crisis/EmotionPicker";
import { MoodShift } from "@/components/crisis/MoodShift";
import { saveCrisisSession } from "@/modules/db/queries";
import { useCrisisSession } from "@/hooks/useCrisisSession";

export default function RerateScreen() {
  const { session, updateSession, resetSession } = useCrisisSession();

  function saveAndExit() {
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
      <ProgressBar step={8} total={8} />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">How intense are those feelings now?</Text>
      <EmotionPicker selected={session.emotions} onChange={(emotions) => updateSession({ emotions })} mode="after" />
      <MoodShift emotions={session.emotions} />
      <Text className="mt-6 font-display text-3xl text-text-primary">You did the work. That shift matters.</Text>
      <CalmButton label="Save and close" className="mt-6 bg-accent" onPress={saveAndExit} />
    </Screen>
  );
}
