import { useState } from "react";
import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { CalendarDays, LifeBuoy, NotebookPen } from "lucide-react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CrisisResourcesBanner } from "@/components/shared/CrisisResourcesBanner";
import { MoodDial } from "@/components/shared/MoodDial";
import { Emotion } from "@/constants/emotions";
import { addDailyCheckIn } from "@/modules/db/queries";
import { useDailyTraining } from "@/hooks/useDailyTraining";
import { useUserStore } from "@/store/userStore";
import { useCrisisStore } from "@/store/crisisStore";

export default function HomeScreen() {
  const [mood, setMood] = useState<Emotion | undefined>();
  const [energy, setEnergy] = useState<"Low" | "Medium" | "High">("Medium");
  const [note, setNote] = useState("");
  const { exercise, day } = useDailyTraining();
  const displayName = useUserStore((state) => state.displayName);
  const recordActivity = useUserStore((state) => state.recordActivity);
  const session = useCrisisStore((state) => state.session);

  function saveCheckIn() {
    if (!mood) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    addDailyCheckIn({ date: today, moodLabel: mood.label, moodScore: mood.score, energy, note });
    recordActivity(today);
    setNote("");
  }

  return (
    <Screen>
      <View className="mb-5 flex-row items-start justify-between">
        <View>
          <Text className="font-body text-base text-text-secondary">Good to see you{displayName ? `, ${displayName}` : ""}</Text>
          <Text className="font-display text-4xl text-text-primary">ClearPath</Text>
        </View>
        <Text className="rounded-full bg-accent-subtle px-3 py-2 font-bodyMed text-sm text-text-primary">Practice {day}</Text>
      </View>

      <View className="mb-6 rounded-calm bg-bg-surface p-5">
        <Text className="font-display text-3xl text-text-primary">What would help right now?</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
          Choose crisis support for a hard moment, or start the daily practice if you have a few quiet minutes.
        </Text>
        <View className="mt-5 flex-row gap-3">
          <CalmButton label="I need help right now" className="flex-1 bg-accent" onPress={() => router.push("/crisis/triage")}>
            <View className="items-center gap-2">
              <LifeBuoy color="white" size={24} />
              <Text className="text-center font-bodyMed text-sm text-white">I need help right now</Text>
            </View>
          </CalmButton>
          <CalmButton label="Today's exercise" variant="subtle" className="flex-1 bg-accent-subtle" onPress={() => router.push(`/train/${day}`)}>
            <View className="items-center gap-2">
              <CalendarDays color="hsl(214, 20%, 22%)" size={24} />
              <Text className="text-center font-bodyMed text-sm text-text-primary">Today's exercise</Text>
            </View>
          </CalmButton>
        </View>
      </View>

      {session.step !== "triage" ? (
        <CalmButton label="Resume your reflection" variant="subtle" className="mb-6 bg-bg-surface" onPress={() => router.push(`/crisis/${session.step}`)} />
      ) : null}

      <Text className="mb-3 font-display text-2xl text-text-primary">Daily check-in</Text>
      <MoodDial selected={mood} onSelect={setMood} />
      <View className="mt-4 flex-row gap-2">
        {(["Low", "Medium", "High"] as const).map((item) => (
          <CalmButton key={item} label={item} className="flex-1" variant={energy === item ? "primary" : "subtle"} onPress={() => setEnergy(item)} />
        ))}
      </View>
      <TextInput
        accessibilityLabel="Optional reflection"
        accessibilityHint="Add anything on your mind today."
        className="mt-4 min-h-[96px] rounded-calm bg-bg-subtle p-4 font-mono text-base text-text-primary"
        multiline
        placeholder="Anything on your mind today?"
        value={note}
        onChangeText={setNote}
      />
      <CalmButton label="Save check-in" className="mt-4 bg-accent" onPress={saveCheckIn} />

      <CalmButton label="Open journal" variant="subtle" className="mt-6 bg-bg-surface" onPress={() => router.push("/journal")}>
        <View className="flex-row items-center gap-3">
          <NotebookPen color="hsl(214, 20%, 22%)" size={22} />
          <View className="flex-1">
            <Text className="font-bodyMed text-base text-text-primary">Open journal</Text>
            <Text className="font-body text-sm text-text-secondary">Review saved reflections and mood shifts.</Text>
          </View>
        </View>
      </CalmButton>

      <CrisisResourcesBanner alwaysVisible />
    </Screen>
  );
}
