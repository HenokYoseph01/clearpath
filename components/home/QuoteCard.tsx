import { Cloud, Moon, Sun } from "lucide-react-native";
import { Text, View } from "react-native";
import { SelectedQuote } from "@/modules/quotes/dailyQuote";

type QuoteCardProps = {
  quote: SelectedQuote;
};

type QuoteBackdrop = "morning" | "afternoon" | "night";

const backdropTheme: Record<
  QuoteBackdrop,
  {
    label: string;
    background: string;
    cloud: string;
    cloudAccent: string;
    softShape: string;
    glow: string;
    icon: typeof Sun;
    iconColor: string;
    noteLabel: string;
  }
> = {
  morning: {
    label: "Morning sky",
    background: "hsl(199, 62%, 91%)",
    cloud: "hsl(204, 44%, 97%)",
    cloudAccent: "hsl(205, 44%, 92%)",
    softShape: "hsl(39, 60%, 78%)",
    glow: "hsl(43, 68%, 86%)",
    icon: Sun,
    iconColor: "hsl(38, 42%, 48%)",
    noteLabel: "Morning note",
  },
  afternoon: {
    label: "Afternoon sky",
    background: "hsl(202, 54%, 88%)",
    cloud: "hsl(204, 44%, 97%)",
    cloudAccent: "hsl(205, 42%, 91%)",
    softShape: "hsl(196, 48%, 78%)",
    glow: "hsl(190, 45%, 84%)",
    icon: Cloud,
    iconColor: "hsl(202, 48%, 55%)",
    noteLabel: "Afternoon reset",
  },
  night: {
    label: "Evening sky",
    background: "hsl(221, 34%, 84%)",
    cloud: "hsl(216, 36%, 92%)",
    cloudAccent: "hsl(218, 34%, 86%)",
    softShape: "hsl(234, 30%, 76%)",
    glow: "hsl(220, 35%, 90%)",
    icon: Moon,
    iconColor: "hsl(220, 28%, 46%)",
    noteLabel: "Evening note",
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

function CornerCloud({ color }: { color: string }) {
  return <SmallCloud color={color} style={{ left: 10, top: 12, opacity: 0.88, transform: [{ scale: 0.7 }] }} />;
}

function Star({ style }: { style: object }) {
  return <View pointerEvents="none" className="absolute h-1.5 w-1.5 rounded-full bg-bg-base opacity-80" style={style} />;
}

function SkyScene({ backdrop, theme }: { backdrop: QuoteBackdrop; theme: (typeof backdropTheme)[QuoteBackdrop] }) {
  if (backdrop === "morning") {
    return (
      <View pointerEvents="none" className="absolute inset-0">
        <View className="absolute right-3 top-[-16px] h-24 w-24 rounded-full opacity-35" style={{ backgroundColor: theme.glow }} />
        <View className="absolute right-9 top-8 h-11 w-11 rounded-full opacity-90" style={{ backgroundColor: theme.softShape }} />
        <CornerCloud color={theme.cloudAccent} />
        <SmallCloud color={theme.cloud} style={{ left: 22, top: 40, opacity: 0.92 }} />
        <SmallCloud color={theme.cloud} style={{ right: 28, top: 80, opacity: 0.7, transform: [{ scale: 0.72 }] }} />
        <SmallCloud color={theme.cloud} style={{ left: 128, top: 16, opacity: 0.52, transform: [{ scale: 0.58 }] }} />
      </View>
    );
  }

  if (backdrop === "night") {
    return (
      <View pointerEvents="none" className="absolute inset-0">
        <View className="absolute right-[-26px] top-[-24px] h-28 w-28 rounded-full opacity-30" style={{ backgroundColor: theme.glow }} />
        <CornerCloud color={theme.cloudAccent} />
        <Star style={{ left: 28, top: 24 }} />
        <Star style={{ left: 74, top: 54, transform: [{ scale: 0.7 }] }} />
        <Star style={{ right: 68, top: 30 }} />
        <Star style={{ right: 28, top: 78, transform: [{ scale: 0.85 }] }} />
        <Star style={{ left: 136, top: 18, transform: [{ scale: 0.6 }] }} />
        <Star style={{ right: 120, top: 104, transform: [{ scale: 0.55 }] }} />
        <SmallCloud color={theme.cloud} style={{ left: 18, bottom: 22, opacity: 0.58, transform: [{ scale: 0.78 }] }} />
        <SmallCloud color={theme.cloud} style={{ right: 20, top: 92, opacity: 0.5, transform: [{ scale: 0.7 }] }} />
      </View>
    );
  }

  return (
    <View pointerEvents="none" className="absolute inset-0">
      <View className="absolute left-[-34px] top-[-28px] h-28 w-28 rounded-full opacity-20" style={{ backgroundColor: theme.glow }} />
      <View className="absolute bottom-[-34px] right-[-18px] h-24 w-24 rounded-full opacity-28" style={{ backgroundColor: theme.softShape }} />
      <CornerCloud color={theme.cloudAccent} />
      <SmallCloud color={theme.cloud} style={{ left: 18, top: 38, opacity: 0.9 }} />
      <SmallCloud color={theme.cloud} style={{ right: 18, top: 64, opacity: 0.78, transform: [{ scale: 0.86 }] }} />
      <SmallCloud color={theme.cloud} style={{ left: 124, bottom: 20, opacity: 0.52, transform: [{ scale: 0.68 }] }} />
    </View>
  );
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const backdrop = getInitialBackdrop(quote);
  const theme = backdropTheme[backdrop];
  const QuoteIcon = theme.icon;

  return (
    <View
      accessibilityLabel={`Quote card. ${theme.label}.`}
      className="mb-6 overflow-hidden rounded-calm p-5"
      style={{ backgroundColor: theme.background }}
    >
      <SkyScene backdrop={backdrop} theme={theme} />
      <View className="relative min-h-[118px] justify-end pt-8">
        <View className="mb-3 flex-row items-center gap-2">
          <QuoteIcon color={theme.iconColor} size={20} />
          <Text className="font-bodyMed text-sm text-text-secondary">{theme.noteLabel}</Text>
        </View>
        <Text className="font-display text-2xl leading-8 text-text-primary">{quote.text}</Text>
      </View>
    </View>
  );
}
