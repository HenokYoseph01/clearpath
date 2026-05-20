import { Href, router } from "expo-router";
import { Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { CalmButton } from "@/components/shared/CalmButton";
import { ProgressBar } from "@/components/shared/ProgressBar";

type CrisisStepHeaderProps = {
  step: number;
  total: number;
  backTo?: Href;
};

export function CrisisStepHeader({ step, total, backTo }: CrisisStepHeaderProps) {
  return (
    <View>
      {backTo ? (
        <CalmButton
          label="Back"
          variant="plain"
          className="mb-4 min-h-[52px] self-start px-0"
          onPress={() => router.push(backTo)}
        >
          <View className="flex-row items-center gap-2">
            <ArrowLeft color="hsl(214, 20%, 22%)" size={20} />
            <Text className="font-bodyMed text-base text-text-primary">Back</Text>
          </View>
        </CalmButton>
      ) : null}
      <ProgressBar step={step} total={total} />
    </View>
  );
}
