import { Href, Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { DistortionKey, distortionDefinitions } from "@/constants/distortions";

type DistortionCardProps = {
  distortion: DistortionKey;
};

export function DistortionCard({ distortion }: DistortionCardProps) {
  const item = distortionDefinitions[distortion];
  const href = { pathname: "/learn/[pattern]", params: { pattern: distortion } } as unknown as Href;
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="button" accessibilityLabel={`Learn about ${item.title}`} className="mb-3 rounded-calm bg-bg-surface p-5">
        <View className="flex-row items-start gap-3">
          <View className="flex-1">
            <Text className="font-display text-xl text-text-primary">{item.title}</Text>
            <Text className="mt-2 font-body text-base leading-7 text-text-secondary">{item.short}</Text>
            <Text className="mt-3 font-mono text-sm leading-6 text-text-primary">{item.example}</Text>
            <Text className="mt-3 font-bodyMed text-sm text-accent">Go deeper</Text>
          </View>
          <ChevronRight color="hsl(202, 48%, 55%)" size={22} />
        </View>
      </Pressable>
    </Link>
  );
}
