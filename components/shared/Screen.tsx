import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
}>;

export function Screen({ children, scroll = true }: ScreenProps) {
  const content = <View className="w-full max-w-[390px] self-center px-5 py-6">{children}</View>;
  return (
    <SafeAreaView className="flex-1 bg-bg-base">
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled">{content}</ScrollView> : content}
    </SafeAreaView>
  );
}
