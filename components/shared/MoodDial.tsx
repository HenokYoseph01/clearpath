import { Text, View } from "react-native";
import { emotions, Emotion } from "@/constants/emotions";
import { CalmButton } from "./CalmButton";

type MoodDialProps = {
  selected?: Emotion;
  onSelect: (emotion: Emotion) => void;
};

export function MoodDial({ selected, onSelect }: MoodDialProps) {
  return (
    <View className="rounded-calm bg-bg-surface p-4">
      <Text className="mb-4 text-center font-display text-2xl text-text-primary">How are you arriving?</Text>
      <View className="flex-row flex-wrap justify-center gap-2">
        {emotions.slice(0, 12).map((emotion) => {
          const active = selected?.label === emotion.label;
          return (
            <CalmButton
              key={emotion.label}
              label={emotion.label}
              variant={active ? "primary" : "subtle"}
              onPress={() => onSelect(emotion)}
              className={`min-h-[56px] min-w-[96px] rounded-calm px-3 ${active ? "bg-accent" : "bg-bg-subtle"}`}
            >
              <Text className={`font-bodyMed text-sm ${active ? "text-white" : "text-text-primary"}`}>{emotion.label}</Text>
            </CalmButton>
          );
        })}
      </View>
    </View>
  );
}
