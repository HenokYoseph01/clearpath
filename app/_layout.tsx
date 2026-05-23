import "react-native-reanimated";
import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useFonts, DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { Lato_300Light, Lato_400Regular } from "@expo-google-fonts/lato";
import { CourierPrime_400Regular } from "@expo-google-fonts/courier-prime";
import { useDatabase } from "@/hooks/useDatabase";
import { createThemeVars, getTheme } from "@/modules/theme/palettes";
import { useUserStore } from "@/store/userStore";

export default function RootLayout() {
  useDatabase();
  const themeId = useUserStore((state) => state.themeId);
  const theme = getTheme(themeId);
  const [loaded] = useFonts({
    DMSerifDisplay_400Regular,
    Lato_300Light,
    Lato_400Regular,
    CourierPrime_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View className="flex-1" style={createThemeVars(theme)}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="crisis" />
        <Stack.Screen name="train/[day]" />
        <Stack.Screen name="journal/[id]" />
        <Stack.Screen name="learn/[pattern]" />
      </Stack>
    </View>
  );
}
