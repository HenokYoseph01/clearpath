import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { CrisisStepHeader } from "@/components/crisis/CrisisStepHeader";
import { useCrisisSession } from "@/hooks/useCrisisSession";

const grounding = ["5 things you can see", "4 things you can feel", "3 things you can hear", "2 things you can smell", "1 thing you can taste"];

export default function GroundingScreen() {
  const { session, updateSession, goToStep } = useCrisisSession();
  const mandatory = session.distressStart >= 8;

  return (
    <Screen>
      <CrisisStepHeader step={2} total={8} backTo="/crisis/triage" />
      <CrisisResourcesBanner distressScore={session.distressStart} />
      <Text className="mt-8 font-display text-3xl text-text-primary">Let your attention land here first.</Text>
      <Text className="mt-3 font-body text-base leading-7 text-text-secondary">Move through this slowly. No timer, no rush.</Text>
      <View className="mt-6 rounded-calm bg-bg-surface p-5">
        {grounding.map((item) => (
          <Text key={item} className="mb-4 font-display text-2xl text-text-primary">{item}</Text>
        ))}
      </View>
      <CalmButton
        label="I am ready to continue"
        className="mt-6 bg-accent"
        onPress={() => {
          updateSession({ groundingCompleted: true });
          goToStep("situation");
        }}
      />
      {!mandatory ? <CalmButton label="Skip grounding" variant="plain" className="mt-2" onPress={() => goToStep("situation")} /> : null}
    </Screen>
  );
}
