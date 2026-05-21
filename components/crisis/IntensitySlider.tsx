import { Text, View } from "react-native";
import Slider from "@react-native-community/slider";

type IntensitySliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export function IntensitySlider({ label, value, onChange }: IntensitySliderProps) {
  return (
    <View className="mb-4 rounded-calm bg-bg-subtle p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-bodyMed text-base text-text-primary">{label}</Text>
        <Text className="font-bodyMed text-base text-text-secondary">{value}%</Text>
      </View>
      <Slider
        accessibilityLabel={`${label} intensity`}
        accessibilityHint="Adjusts how strong this feeling is."
        minimumValue={0}
        maximumValue={100}
        step={5}
        value={value}
        minimumTrackTintColor="hsl(202, 48%, 55%)"
        maximumTrackTintColor="hsl(202, 28%, 83%)"
        thumbTintColor="hsl(202, 48%, 55%)"
        onValueChange={onChange}
      />
    </View>
  );
}
