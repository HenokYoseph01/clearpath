import { useEffect } from "react";
import { Href, router } from "expo-router";
import { Image, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const homeRoute = "/(tabs)" as Href;

export default function TitleScreen() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);
  const scale = useSharedValue(0.98);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) });
    scale.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });

    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 420, easing: Easing.inOut(Easing.cubic) });
      translateY.value = withDelay(60, withTiming(-10, { duration: 420, easing: Easing.inOut(Easing.cubic) }));
      router.replace(homeRoute);
    }, 1450);

    return () => clearTimeout(timer);
  }, [opacity, scale, translateY]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center bg-bg-base px-8">
      <Animated.View className="items-center" style={logoStyle}>
        <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-accent-subtle">
          <Image source={require("../assets/icon.png")} className="h-14 w-14" resizeMode="contain" />
        </View>
        <Text className="font-display text-5xl text-text-primary">ClearPath</Text>
        <Text className="mt-3 text-center font-body text-base leading-7 text-text-secondary">
          A quiet place to sort one thought at a time.
        </Text>
      </Animated.View>
    </View>
  );
}
