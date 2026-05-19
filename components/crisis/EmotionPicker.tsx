import { Text, View } from "react-native";
import { emotions } from "@/constants/emotions";
import { StoredEmotion } from "@/modules/db/queries";
import { CalmButton } from "@/components/shared/CalmButton";
import { IntensitySlider } from "./IntensitySlider";

type EmotionPickerProps = {
  selected: StoredEmotion[];
  onChange: (emotions: StoredEmotion[]) => void;
  mode?: "before" | "after";
};

export function EmotionPicker({ selected, onChange, mode = "before" }: EmotionPickerProps) {
  function toggle(label: string) {
    const exists = selected.some((emotion) => emotion.label === label);
    if (exists) {
      onChange(selected.filter((emotion) => emotion.label !== label));
      return;
    }
    if (selected.length >= 5) {
      return;
    }
    onChange([...selected, { label, intensityBefore: 50 }]);
  }

  function updateIntensity(label: string, value: number) {
    onChange(
      selected.map((emotion) =>
        emotion.label === label
          ? mode === "after"
            ? { ...emotion, intensityAfter: value }
            : { ...emotion, intensityBefore: value }
          : emotion,
      ),
    );
  }

  return (
    <View>
      <View className="mb-5 flex-row flex-wrap gap-2">
        {emotions.map((emotion) => {
          const active = selected.some((item) => item.label === emotion.label);
          return (
            <CalmButton
              key={emotion.label}
              label={emotion.label}
              variant={active ? "primary" : "subtle"}
              onPress={() => toggle(emotion.label)}
              className={`min-h-[56px] rounded-calm px-3 ${active ? "bg-accent" : "bg-bg-subtle"}`}
            >
              <Text className={`font-bodyMed text-sm ${active ? "text-white" : "text-text-primary"}`}>{emotion.label}</Text>
            </CalmButton>
          );
        })}
      </View>
      {selected.map((emotion) => (
        <IntensitySlider
          key={emotion.label}
          label={emotion.label}
          value={mode === "after" ? (emotion.intensityAfter ?? emotion.intensityBefore) : emotion.intensityBefore}
          onChange={(value) => updateIntensity(emotion.label, value)}
        />
      ))}
    </View>
  );
}
