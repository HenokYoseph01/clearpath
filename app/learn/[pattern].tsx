import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "@/components/shared/Screen";
import { CalmButton } from "@/components/shared/CalmButton";
import { DistortionKey, distortionDefinitions } from "@/constants/distortions";

const patternKeys = Object.keys(distortionDefinitions) as DistortionKey[];

function isDistortionKey(value: string | undefined): value is DistortionKey {
  return !!value && patternKeys.includes(value as DistortionKey);
}

function Section({ title, children }: { title: string; children: string[] }) {
  return (
    <View className="mt-4 rounded-calm bg-bg-surface p-5">
      <Text className="font-display text-2xl text-text-primary">{title}</Text>
      {children.map((item, index) => (
        <Text key={item} className="mt-3 font-body text-base leading-7 text-text-secondary">
          {index + 1}. {item}
        </Text>
      ))}
    </View>
  );
}

export default function ThinkingPatternScreen() {
  const params = useLocalSearchParams<{ pattern: string }>();
  const pattern = params.pattern;

  if (!isDistortionKey(pattern)) {
    return (
      <Screen>
        <Text className="font-display text-4xl text-text-primary">Pattern not found</Text>
        <Text className="mt-4 font-body text-base leading-7 text-text-secondary">
          This learning page is not available. Go back to the Learn tab and choose a thinking pattern from the list.
        </Text>
        <CalmButton label="Back to Learn" className="mt-6 bg-accent" onPress={() => router.replace("/learn")} />
      </Screen>
    );
  }

  const item = distortionDefinitions[pattern];

  return (
    <Screen>
      <CalmButton label="Back to Learn" variant="subtle" className="mb-5 bg-bg-surface" onPress={() => router.replace("/learn")} />
      <Text className="font-body text-sm text-text-tertiary">Thinking pattern</Text>
      <Text className="mt-2 font-display text-4xl text-text-primary">{item.title}</Text>
      <Text className="mt-4 font-body text-base leading-7 text-text-secondary">{item.deeper}</Text>

      <View className="mt-6 rounded-calm bg-bg-subtle p-5">
        <Text className="font-bodyMed text-base text-text-primary">Example</Text>
        <Text className="mt-2 font-mono text-base leading-7 text-text-primary">{item.example}</Text>
      </View>

      <Section title="How to recognize it" children={item.signs} />
      <Section title="Questions to ask" children={item.questions} />
      <Section title="What to try" children={item.tryThis} />

      <View className="mt-4 rounded-calm bg-accent-subtle p-5">
        <Text className="font-display text-2xl text-text-primary">Balanced thought starter</Text>
        <Text className="mt-3 font-body text-base leading-7 text-text-secondary">{item.balancedStarter}</Text>
      </View>

      <Text className="mt-4 rounded-calm bg-bg-surface p-5 font-body text-base leading-7 text-text-secondary">
        A thinking pattern is not a personal flaw. It is a signal to slow down, check the thought, and respond with more accuracy and care.
      </Text>
    </Screen>
  );
}
