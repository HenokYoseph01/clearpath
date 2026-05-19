import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { setAnthropicApiKey } from "@/modules/ai/client";
import { clearAllData } from "@/modules/db/queries";
import { scheduleDailyReminder } from "@/modules/notifications/scheduler";
import { useUserStore } from "@/store/userStore";

export default function SettingsTab() {
  const displayName = useUserStore((state) => state.displayName);
  const setDisplayName = useUserStore((state) => state.setDisplayName);
  const [apiKey, setApiKey] = useState("");
  const [deleteText, setDeleteText] = useState("");

  async function saveReminder() {
    const result = await scheduleDailyReminder(8, 30);
    Alert.alert(result.ok ? "Reminder set" : "Reminder unavailable", result.message);
  }

  async function saveKey() {
    await setAnthropicApiKey(apiKey);
    setApiKey("");
    Alert.alert("Saved", "AI support will be used when it is available.");
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
        <TextInput
          accessibilityLabel="Display name"
          accessibilityHint="Used only for the home greeting."
          className="mt-4 min-h-[52px] rounded-calm bg-bg-subtle px-4 font-body text-base text-text-primary"
          placeholder="Display name"
          value={displayName}
          onChangeText={setDisplayName}
        />
        <CalmButton label="Set 8:30 reminder" variant="subtle" className="mt-4" onPress={saveReminder} />
      </View>
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-display text-2xl text-text-primary">AI support</Text>
        <TextInput
          accessibilityLabel="Anthropic API key"
          accessibilityHint="Stores your key in the device keychain."
          className="mt-4 min-h-[52px] rounded-calm bg-bg-subtle px-4 font-mono text-base text-text-primary"
          placeholder="Anthropic API key"
          secureTextEntry
          value={apiKey}
          onChangeText={setApiKey}
        />
        <CalmButton label="Save API key" className="mt-4 bg-accent" onPress={saveKey} />
      </View>
      <View className="mt-5 rounded-calm bg-bg-surface p-4">
        <Text className="font-display text-2xl text-text-primary">Your data</Text>
        <Text className="mt-2 font-body text-base leading-7 text-text-secondary">All ClearPath entries stay on this device unless you choose to export them later.</Text>
        <TextInput
          accessibilityLabel="Delete confirmation"
          accessibilityHint="Type DELETE to clear local data."
          className="mt-4 min-h-[52px] rounded-calm bg-bg-subtle px-4 font-body text-base text-text-primary"
          placeholder="Type DELETE"
          value={deleteText}
          onChangeText={setDeleteText}
        />
        <CalmButton label="Clear all data" variant="plain" className="mt-4" onPress={deleteData} />
      </View>
    </Screen>
  );
}
