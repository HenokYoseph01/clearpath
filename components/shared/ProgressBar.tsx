import { DimensionValue, View } from "react-native";

type ProgressBarProps = {
  step: number;
  total: number;
};

export function ProgressBar({ step, total }: ProgressBarProps) {
  const width = `${Math.min(100, Math.max(0, (step / total) * 100))}%` as DimensionValue;
  return (
    <View accessibilityRole="progressbar" className="h-2 overflow-hidden rounded-full bg-accent-subtle">
      <View className="h-full rounded-full bg-accent" style={{ width }} />
    </View>
  );
}
