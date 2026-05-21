import { Tabs } from "expo-router";
import { BookOpen, Home, NotebookPen, Settings, Sprout } from "lucide-react-native";

const iconColor = "hsl(214, 20%, 22%)";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "hsl(204, 38%, 93%)",
          borderTopWidth: 0,
          minHeight: 68,
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
