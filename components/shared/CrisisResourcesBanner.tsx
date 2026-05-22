import { Text, View } from "react-native";
import { LifeBuoy } from "lucide-react-native";

type CrisisResourcesBannerProps = {
  distressScore?: number;
  alwaysVisible?: boolean;
};

export function CrisisResourcesBanner({ distressScore = 0, alwaysVisible = false }: CrisisResourcesBannerProps) {
  if (!alwaysVisible && distressScore < 8) {
    return null;
  }

  return (
    <View className="my-4 rounded-calm bg-crisis-bg p-4">
      <View className="flex-row items-center gap-3">
        <LifeBuoy color="hsl(5, 40%, 35%)" size={22} />
        <Text className="flex-1 font-bodyMed text-base text-crisis-text">
          If you might be in immediate danger or feel unable to stay safe, contact local emergency help or a crisis line in your area.
        </Text>
      </View>
    </View>
  );
}
