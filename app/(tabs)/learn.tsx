import { Text } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { DistortionCard } from "@/components/learn/DistortionCard";
import { distortionDefinitions, DistortionKey } from "@/constants/distortions";

export default function LearnTab() {
  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Learn</Text>
      <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
        CBT helps separate what happened, what your mind said, what you felt, and what you did next.
      </Text>
      <Text className="mt-6 font-display text-2xl text-text-primary">Thinking patterns</Text>
      {(Object.keys(distortionDefinitions) as DistortionKey[]).map((key) => (
        <DistortionCard key={key} distortion={key} />
      ))}
      <Text className="mt-4 rounded-calm bg-bg-surface p-5 font-body text-base leading-7 text-text-secondary">
        ClearPath is a self-help wellness tool. It works best alongside, not instead of, professional support.
      </Text>
    </Screen>
  );
}
