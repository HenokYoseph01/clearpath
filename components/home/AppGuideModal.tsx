import { BookOpen, ChevronDown, Home, NotebookPen, Settings, Sprout } from "lucide-react-native";
import { Modal, ScrollView, Text, View } from "react-native";
import { CalmButton } from "@/components/shared/CalmButton";

type AppGuideModalProps = {
  visible: boolean;
  onDone: () => void;
};

const guideItems = [
  {
    title: "Home",
    text: "Start with a check-in, a quote, or a gentle reflection.",
    icon: Home,
  },
  {
    title: "Train",
    text: "Practice one small thinking skill at a time.",
    icon: Sprout,
  },
  {
    title: "Journal",
    text: "Look back at reflections, mood notes, and patterns.",
    icon: NotebookPen,
  },
  {
    title: "Learn",
    text: "Understand cognitive behavioral therapy in plain words.",
    icon: BookOpen,
  },
  {
    title: "Settings",
    text: "Change themes, adjust reminders, or manage local data.",
    icon: Settings,
  },
];

function GuideCloud({ className = "" }: { className?: string }) {
  return (
    <View pointerEvents="none" className={`absolute opacity-90 ${className}`}>
      <View className="h-5 w-14 rounded-full bg-bg-base" />
      <View className="absolute left-2 top-[-6px] h-6 w-6 rounded-full bg-bg-base" />
      <View className="absolute left-7 top-[-8px] h-8 w-8 rounded-full bg-bg-base" />
      <View className="absolute left-11 top-[-2px] h-5 w-7 rounded-full bg-bg-base" />
    </View>
  );
}

export function AppGuideModal({ visible, onDone }: AppGuideModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDone}>
      <View className="flex-1 justify-center bg-text-primary/30 px-5">
        <View className="max-h-[86%] overflow-hidden rounded-calm bg-accent-subtle">
          <View className="absolute left-14 top-20 h-20 w-20 rounded-full bg-calm opacity-30" />
          <View className="absolute right-10 top-40 h-16 w-16 rounded-full bg-bg-base opacity-35" />
          <GuideCloud className="left-16 top-10 scale-75" />
          <GuideCloud className="right-16 top-28 scale-[0.6] opacity-70" />

          <ScrollView contentContainerClassName="px-5 py-6" showsVerticalScrollIndicator>
            <Text className="font-bodyMed text-sm text-text-secondary">Welcome to ClearPath</Text>
            <Text className="mt-2 font-display text-4xl leading-[44px] text-text-primary">A soft place to sort a hard moment.</Text>
            <Text className="mt-3 font-body text-base leading-7 text-text-secondary">
              No rush. Pick the part that fits today, and let the app meet you there.
            </Text>
            <View className="mt-4 flex-row items-center gap-2 self-start rounded-full bg-bg-base/70 px-3 py-2">
              <Text className="font-bodyMed text-xs text-text-secondary">Scroll for the full guide</Text>
              <ChevronDown color="hsl(213, 14%, 42%)" size={15} />
            </View>

            <View className="mt-6 gap-3">
              {guideItems.map((item) => {
                const Icon = item.icon;
                return (
                  <View key={item.title} className="flex-row items-center gap-3 rounded-calm bg-bg-base/80 p-4">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-calm">
                      <Icon color="hsl(214, 20%, 22%)" size={21} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bodyMed text-base text-text-primary">{item.title}</Text>
                      <Text className="mt-1 font-body text-sm leading-5 text-text-secondary">{item.text}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <Text className="mt-5 rounded-calm bg-bg-base/70 p-4 font-body text-sm leading-6 text-text-secondary">
              Your notes stay local by default. If something feels urgent or unsafe, contact local emergency help or a crisis line in your area.
            </Text>

            <CalmButton label="Begin gently" className="mt-5 bg-accent" onPress={onDone} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
