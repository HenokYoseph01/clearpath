import { Text } from "react-native";
import { DistortionKey, distortionDefinitions } from "@/constants/distortions";
import { CalmButton } from "@/components/shared/CalmButton";

type DistortionTagProps = {
  distortion: DistortionKey;
  selected: boolean;
  onPress: () => void;
};

export function DistortionTag({ distortion, selected, onPress }: DistortionTagProps) {
  return (
    <CalmButton label={distortionDefinitions[distortion].title} variant={selected ? "primary" : "subtle"} onPress={onPress}>
      <Text className={`font-bodyMed text-sm ${selected ? "text-white" : "text-text-primary"}`}>
        {distortionDefinitions[distortion].title}
      </Text>
    </CalmButton>
  );
}
