import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen, Home, NotebookPen, Settings, Sprout } from "lucide-react-native";
import { getTheme } from "@/modules/theme/palettes";
import { useUserStore } from "@/store/userStore";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const themeId = useUserStore((state) => state.themeId);
  const theme = getTheme(themeId);
  const iconColor = theme.textPrimary;
  const bottomInset = Math.max(insets.bottom, 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.bgSurface,
          borderTopWidth: 0,
          height: 56 + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarIconStyle: {
          alignItems: "center",
          justifyContent: "center",
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarAccessibilityLabel: "Home", tabBarIcon: ({ focused }) => <Home color={iconColor} size={focused ? 28 : 24} /> }} />
      <Tabs.Screen name="train" options={{ tabBarAccessibilityLabel: "Training", tabBarIcon: ({ focused }) => <Sprout color={iconColor} size={focused ? 28 : 24} /> }} />
      <Tabs.Screen name="journal" options={{ tabBarAccessibilityLabel: "Journal", tabBarIcon: ({ focused }) => <NotebookPen color={iconColor} size={focused ? 28 : 24} /> }} />
      <Tabs.Screen name="learn" options={{ tabBarAccessibilityLabel: "Learn", tabBarIcon: ({ focused }) => <BookOpen color={iconColor} size={focused ? 28 : 24} /> }} />
      <Tabs.Screen name="settings" options={{ tabBarAccessibilityLabel: "Settings", tabBarIcon: ({ focused }) => <Settings color={iconColor} size={focused ? 28 : 24} /> }} />
    </Tabs>
  );
}
