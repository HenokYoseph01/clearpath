import { Cloud, Moon, Sun } from "lucide-react-native";
import { Text, View } from "react-native";
import { SelectedQuote } from "@/modules/quotes/dailyQuote";

type QuoteCardProps = {
  quote: SelectedQuote;
};

function CloudEdge({ side }: { side: "left" | "right" }) {
  const alignment = side === "left" ? "left-[-18px]" : "right-[-18px]";
  return (
    <View pointerEvents="none" className={`absolute top-[-10px] ${alignment} opacity-70`}>
      <View className="h-10 w-24 rounded-full bg-bg-base" />
      <View className="absolute left-5 top-[-8px] h-10 w-10 rounded-full bg-bg-base" />
      <View className="absolute left-12 top-[-5px] h-12 w-12 rounded-full bg-bg-base" />
    </View>
  );
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const QuoteIcon = quote.period === "morning" ? Sun : quote.period === "evening" || quote.period === "quiet" ? Moon : Cloud;

  return (
    <View className="mb-6 overflow-hidden rounded-calm bg-accent-subtle p-5">
      <CloudEdge side="left" />
      <CloudEdge side="right" />
      <View className="relative">
        <View className="mb-3 flex-row items-center gap-2">
          <QuoteIcon color="hsl(202, 48%, 55%)" size={20} />
          <Text className="font-bodyMed text-sm text-text-secondary">{quote.label}</Text>
        </View>
        <Text className="font-display text-2xl leading-8 text-text-primary">{quote.text}</Text>
      </View>
    </View>
  );
}
