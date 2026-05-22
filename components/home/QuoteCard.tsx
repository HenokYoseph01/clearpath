import { Cloud, Moon, Sun } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SelectedQuote } from "@/modules/quotes/dailyQuote";

type QuoteCardProps = {
  quote: SelectedQuote;
};

type QuoteBackdrop = "morning" | "afternoon" | "night";

const backdropOrder: QuoteBackdrop[] = ["morning", "afternoon", "night"];

const backdropTheme: Record<
  QuoteBackdrop,
  {
    label: string;
    background: string;
    cloud: string;
    softShape: string;
    icon: typeof Sun;
    iconColor: string;
  }
> = {
  morning: {
    label: "Morning sky",
    background: "hsl(200, 58%, 92%)",
    cloud: "hsl(204, 44%, 97%)",
    softShape: "hsl(38, 52%, 78%)",
    icon: Sun,
    iconColor: "hsl(38, 42%, 48%)",
  },
  afternoon: {
    label: "Afternoon sky",
    background: "hsl(202, 48%, 88%)",
    cloud: "hsl(204, 44%, 97%)",
    softShape: "hsl(196, 42%, 78%)",
    icon: Cloud,
    iconColor: "hsl(202, 48%, 55%)",
  },
  night: {
    label: "Evening sky",
    background: "hsl(214, 32%, 86%)",
    cloud: "hsl(211, 34%, 93%)",
    softShape: "hsl(230, 25%, 78%)",
    icon: Moon,
    iconColor: "hsl(220, 28%, 46%)",
  },
};

function getInitialBackdrop(quote: SelectedQuote): QuoteBackdrop {
  if (quote.period === "morning") {
    return "morning";
  }
  if (quote.period === "afternoon") {
    return "afternoon";
  }
  return "night";
}

function SmallCloud({ color, style }: { color: string; style: object }) {
  return (
    <View pointerEvents="none" className="absolute opacity-85" style={style}>
      <View className="h-5 w-14 rounded-full" style={{ backgroundColor: color }} />
      <View className="absolute left-2 top-[-6px] h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
      <View className="absolute left-7 top-[-8px] h-8 w-8 rounded-full" style={{ backgroundColor: color }} />
      <View className="absolute left-11 top-[-2px] h-5 w-7 rounded-full" style={{ backgroundColor: color }} />
    </View>
  );
}

function Star({ style }: { style: object }) {
  return <View pointerEvents="none" className="absolute h-1.5 w-1.5 rounded-full bg-bg-base opacity-80" style={style} />;
}

function SkyScene({ backdrop, theme }: { backdrop: QuoteBackdrop; theme: (typeof backdropTheme)[QuoteBackdrop] }) {
  if (backdrop === "morning") {
    return (
      <View pointerEvents="none" className="absolute inset-0">
        <View className="absolute right-8 top-6 h-12 w-12 rounded-full opacity-80" style={{ backgroundColor: theme.softShape }} />
        <SmallCloud color={theme.cloud} style={{ left: 24, top: 34 }} />
        <SmallCloud color={theme.cloud} style={{ right: 26, top: 76, transform: [{ scale: 0.78 }] }} />
      </View>
    );
  }

  if (backdrop === "night") {
    return (
      <View pointerEvents="none" className="absolute inset-0">
        <Star style={{ left: 28, top: 26 }} />
        <Star style={{ left: 76, top: 52, transform: [{ scale: 0.7 }] }} />
        <Star style={{ right: 58, top: 28 }} />
        <Star style={{ right: 30, top: 72, transform: [{ scale: 0.85 }] }} />
        <Star style={{ left: 136, top: 18, transform: [{ scale: 0.6 }] }} />
        <SmallCloud color={theme.cloud} style={{ left: 18, bottom: 20, opacity: 0.58, transform: [{ scale: 0.82 }] }} />
        <SmallCloud color={theme.cloud} style={{ right: 20, top: 92, opacity: 0.52, transform: [{ scale: 0.72 }] }} />
      </View>
    );
  }

  return (
    <View pointerEvents="none" className="absolute inset-0">
      <SmallCloud color={theme.cloud} style={{ left: 20, top: 26 }} />
      <SmallCloud color={theme.cloud} style={{ right: 18, top: 62, transform: [{ scale: 0.9 }] }} />
      <SmallCloud color={theme.cloud} style={{ left: 118, bottom: 18, opacity: 0.58, transform: [{ scale: 0.72 }] }} />
      <View className="absolute bottom-[-34px] right-[-18px] h-24 w-24 rounded-full opacity-35" style={{ backgroundColor: theme.softShape }} />
    </View>
  );
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const [backdrop, setBackdrop] = useState<QuoteBackdrop>(() => getInitialBackdrop(quote));
  const theme = backdropTheme[backdrop];
  const QuoteIcon = theme.icon;

  useEffect(() => {
    setBackdrop(getInitialBackdrop(quote));
  }, [quote.period, quote.text]);

  function cycleBackdrop() {
    setBackdrop((current) => backdropOrder[(backdropOrder.indexOf(current) + 1) % backdropOrder.length]);
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Quote card. ${theme.label}. Tap to preview another sky background.`}
      onPress={cycleBackdrop}
      className="mb-6 overflow-hidden rounded-calm p-5"
      style={{ backgroundColor: theme.background }}
    >
      <SkyScene backdrop={backdrop} theme={theme} />
      <View className="relative min-h-[118px] justify-end pt-8">
        <View className="mb-3 flex-row items-center gap-2">
          <QuoteIcon color={theme.iconColor} size={20} />
          <Text className="font-bodyMed text-sm text-text-secondary">{quote.label}</Text>
        </View>
        <Text className="font-display text-2xl leading-8 text-text-primary">{quote.text}</Text>
      </View>
    </Pressable>
  );
}
