import { Linking, Text, View } from "react-native";
import { LifeBuoy } from "lucide-react-native";
import { crisisLines } from "@/constants/crisisResources";
import { CalmButton } from "./CalmButton";

type CrisisResourcesBannerProps = {
  distressScore?: number;
  alwaysVisible?: boolean;
};

export function CrisisResourcesBanner({ distressScore = 0, alwaysVisible = false }: CrisisResourcesBannerProps) {
  if (!alwaysVisible && distressScore < 8) {
    return null;
  }

  const primary = crisisLines[1];

  return (
    <View className="my-4 rounded-calm bg-crisis-bg p-4">
      <View className="flex-row items-center gap-3">
        <LifeBuoy color="hsl(5, 40%, 35%)" size={22} />
        <Text className="flex-1 font-bodyMed text-base text-crisis-text">
          If you might be in immediate danger, contact local emergency help or a crisis line.
        </Text>
      </View>
      <CalmButton
        className="mt-3 min-h-[52px] rounded-calm bg-bg-base"
        label={primary.number}
        onPress={() => primary.url && Linking.openURL(primary.url)}
        variant="subtle"
      />
    </View>
  );
}
