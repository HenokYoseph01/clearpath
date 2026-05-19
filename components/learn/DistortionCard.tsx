import { Text, View } from "react-native";
import { DistortionKey, distortionDefinitions } from "@/constants/distortions";

type DistortionCardProps = {
  distortion: DistortionKey;
};

export function DistortionCard({ distortion }: DistortionCardProps) {
  const item = distortionDefinitions[distortion];
  return (
    <View className="mb-3 rounded-calm bg-bg-surface p-5">
      <Text className="font-display text-xl text-text-primary">{item.title}</Text>
      <Text className="mt-2 font-body text-base leading-7 text-text-secondary">{item.short}</Text>
      <Text className="mt-3 font-mono text-sm leading-6 text-text-primary">{item.example}</Text>
    </View>
  );
}
