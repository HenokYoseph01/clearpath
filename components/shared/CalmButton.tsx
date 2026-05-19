import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { spring } from "@/tokens/animation";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CalmButtonProps = PropsWithChildren<
  PressableProps & {
    variant?: "primary" | "subtle" | "plain";
    label?: string;
    className?: string;
  }
>;

export function CalmButton({ children, label, variant = "primary", className = "", ...props }: CalmButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const variantClass =
    variant === "primary"
      ? "bg-accent"
      : variant === "subtle"
        ? "bg-accent-subtle"
        : "bg-transparent";
  const textClass = variant === "primary" ? "text-white" : "text-text-primary";

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Activates this ClearPath action."
      {...props}
      onPressIn={(event) => {
        scale.value = withSpring(0.97, spring.steady);
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withSpring(1, spring.steady);
        props.onPressOut?.(event);
      }}
      className={`min-h-[52px] items-center justify-center rounded-calm px-5 py-4 ${variantClass} ${className}`}
      style={animatedStyle}
    >
      {children ?? <Text className={`font-bodyMed text-base ${textClass}`}>{label}</Text>}
    </AnimatedPressable>
  );
}
