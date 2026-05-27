import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { CalmTextInput } from "@/components/shared/CalmTextInput";
import { clearAllData } from "@/modules/db/queries";
import { scheduleDailyReminder } from "@/modules/notifications/scheduler";
import { clearPathThemes } from "@/modules/theme/palettes";
import { useUserStore } from "@/store/userStore";

export default function SettingsTab() {
  const displayName = useUserStore((state) => state.displayName);
  const setDisplayName = useUserStore((state) => state.setDisplayName);
  const themeId = useUserStore((state) => state.themeId);
  const setThemeId = useUserStore((state) => state.setThemeId);
  const [deleteText, setDeleteText] = useState("");

  async function saveReminder() {
    const result = await scheduleDailyReminder(8, 30);
    Alert.alert(result.ok ? "Reminder set" : "Reminder unavailable", result.message);
  }

  function deleteData() {
    if (deleteText !== "DELETE") {
      return;
    }
    clearAllData();
    setDeleteText("");
    Alert.alert("Data cleared", "Your local ClearPath entries were removed.");
  }

  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Settings</Text>
      <View className="mt-6 rounded-calm bg-bg-surface p-4">
        <Text className="font-display text-2xl text-text-primary">Your experience</Text>
        <CalmTextInput
          accessibilityLabel="Display name"
          accessibilityHint="Used only for the home greeting."
          className="mt-4 min-h-[52px] px-4"
          placeholder="Display name"
          value={displayName}
          onChangeText={setDisplayName}
        />
        <CalmButton label="Set 8:30 reminder" variant="subtle" className="mt-4" onPress={saveReminder} />
      </View>
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-display text-2xl text-text-primary">Theme</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
          Choose a calm color family for ClearPath.
        </Text>
        <View className="mt-4 gap-3">
          {clearPathThemes.map((theme) => {
            const selected = theme.id === themeId;
            return (
              <Pressable
                key={theme.id}
                accessibilityRole="button"
                accessibilityLabel={`Use ${theme.name} theme`}
                accessibilityState={{ selected }}
                className={`min-h-[68px] flex-row items-center gap-3 rounded-calm p-4 ${selected ? "bg-accent-subtle" : "bg-bg-subtle"}`}
                onPress={() => setThemeId(theme.id)}
              >
                <View className="h-10 w-10 rounded-full" style={{ backgroundColor: theme.swatch }} />
                <View className="flex-1">
                  <Text className="font-bodyMed text-base text-text-primary">{theme.name}</Text>
                  <Text className="mt-1 font-body text-sm leading-5 text-text-secondary">{theme.description}</Text>
                </View>
                {selected ? (
                  <View className="h-8 w-8 items-center justify-center rounded-full bg-accent">
                    <Check color="white" size={18} />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </View>
      {/*
        AI support is intentionally hidden for the basic MVP. The local CBT flow
        still works with rule-based thinking-pattern detection and template
        balanced thoughts.
      */}
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-display text-2xl text-text-primary">Your data</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">All ClearPath entries stay on this device unless you choose to export them later.</Text>
        <CalmTextInput
          accessibilityLabel="Delete confirmation"
          accessibilityHint="Type DELETE to clear local data."
          className="mt-4 min-h-[52px] px-4"
          placeholder="Type DELETE"
          value={deleteText}
          onChangeText={setDeleteText}
        />
        <CalmButton label="Clear all data" variant="plain" className="mt-4" onPress={deleteData} />
      </View>
    </Screen>
  );
}
