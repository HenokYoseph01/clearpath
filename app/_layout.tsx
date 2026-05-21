import "react-native-reanimated";
import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { Lato_300Light, Lato_400Regular } from "@expo-google-fonts/lato";
import { CourierPrime_400Regular } from "@expo-google-fonts/courier-prime";
import { useDatabase } from "@/hooks/useDatabase";

export default function RootLayout() {
  useDatabase();
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
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="crisis" />
        <Stack.Screen name="train/[day]" />
        <Stack.Screen name="journal/[id]" />
        <Stack.Screen name="learn/[pattern]" />
      </Stack>
    </>
  );
}
