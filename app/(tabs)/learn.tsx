import { Brain, HeartPulse, Lightbulb, Wind } from "lucide-react-native";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { DistortionCard } from "@/components/learn/DistortionCard";
import { distortionDefinitions, DistortionKey } from "@/constants/distortions";

export default function LearnTab() {
  return (
    <Screen>
      <Text className="font-display text-4xl text-text-primary">Learn</Text>
      <Text className="mt-2 font-body text-base leading-7 text-text-secondary">
        Cognitive Behavioral Therapy is a practical approach for understanding how situations, thoughts, feelings, body sensations, and actions influence one another.
      </Text>

      <View className="mt-6 rounded-calm bg-bg-surface p-5">
        <View className="flex-row items-center gap-3">
          <Brain color="hsl(202, 48%, 55%)" size={24} />
          <Text className="flex-1 font-display text-2xl text-text-primary">What it helps you practice</Text>
        </View>
        <Text className="mt-4 font-body text-base leading-7 text-text-secondary">
          The point is not to force positive thinking. It is to slow down enough to notice what your mind is saying, check whether that thought is fair, and choose a response that fits the real situation.
        </Text>
      </View>

      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <View className="flex-row items-center gap-3">
          <HeartPulse color="hsl(202, 48%, 55%)" size={24} />
          <Text className="flex-1 font-display text-2xl text-text-primary">The ClearPath loop</Text>
        </View>
        {["What happened?", "What did my mind say?", "What did I feel in my body?", "What did I want to do?", "What would be a balanced next step?"].map((step, index) => (
          <Text key={step} className="mt-3 font-body text-base leading-7 text-text-secondary">
            {index + 1}. {step}
          </Text>
        ))}
      </View>

      <View className="mt-4 rounded-calm bg-bg-surface p-5">
        <View className="flex-row items-center gap-3">
          <Wind color="hsl(202, 48%, 55%)" size={24} />
          <Text className="flex-1 font-display text-2xl text-text-primary">When you are activated</Text>
        </View>
        <Text className="mt-4 font-body text-base leading-7 text-text-secondary">
          Start with grounding before analyzing. Try one slow breath, name five things you can see, press your feet into the floor, then return to the thought when your body has a little more room.
        </Text>
      </View>

      <View className="mt-6 flex-row items-center gap-3">
        <Lightbulb color="hsl(202, 48%, 55%)" size={24} />
        <Text className="flex-1 font-display text-2xl text-text-primary">Thinking patterns</Text>
      </View>
      <Text className="mt-2 mb-4 font-body text-base leading-7 text-text-secondary">
        These are common mental shortcuts that can become painful under stress. Tap any pattern to learn how to recognize it and what to try.
      </Text>
      {(Object.keys(distortionDefinitions) as DistortionKey[]).map((key) => (
        <DistortionCard key={key} distortion={key} />
      ))}
      <Text className="mt-4 rounded-calm bg-bg-surface p-5 font-body text-base leading-7 text-text-secondary">
        ClearPath is a self-help wellness tool. It works best alongside, not instead of, professional support.
      </Text>
    </Screen>
  );
}
