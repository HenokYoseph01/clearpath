import { vars } from "nativewind";

export type ThemeId = "sky" | "sage" | "lavender" | "mist" | "rose";

export type ClearPathTheme = {
  id: ThemeId;
  name: string;
  description: string;
  swatch: string;
  bgBase: string;
  bgSurface: string;
  bgSubtle: string;
  bgMuted: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentSubtle: string;
  calm: string;
  gentleGreen: string;
  softAmber: string;
  crisisBg: string;
  crisisText: string;
};

export const clearPathThemes: ClearPathTheme[] = [
  {
    id: "sky",
    name: "Soft Sky",
    description: "Airy blue, open and familiar.",
    swatch: "hsl(202, 48%, 55%)",
    bgBase: "hsl(204, 44%, 97%)",
    bgSurface: "hsl(204, 38%, 93%)",
    bgSubtle: "hsl(203, 34%, 88%)",
    bgMuted: "hsl(202, 28%, 83%)",
    textPrimary: "hsl(214, 20%, 22%)",
    textSecondary: "hsl(213, 14%, 42%)",
    textTertiary: "hsl(212, 10%, 60%)",
    accent: "hsl(202, 48%, 55%)",
    accentSubtle: "hsl(202, 48%, 88%)",
    calm: "hsl(196, 42%, 78%)",
    gentleGreen: "hsl(152, 18%, 68%)",
    softAmber: "hsl(38, 22%, 72%)",
    crisisBg: "hsl(5, 35%, 93%)",
    crisisText: "hsl(5, 40%, 35%)",
  },
  {
    id: "sage",
    name: "Quiet Sage",
    description: "Soft green, steady and grounded.",
    swatch: "hsl(147, 24%, 50%)",
    bgBase: "hsl(140, 30%, 97%)",
    bgSurface: "hsl(139, 24%, 92%)",
    bgSubtle: "hsl(140, 22%, 87%)",
    bgMuted: "hsl(139, 17%, 81%)",
    textPrimary: "hsl(154, 16%, 22%)",
    textSecondary: "hsl(153, 12%, 40%)",
    textTertiary: "hsl(150, 8%, 58%)",
    accent: "hsl(147, 24%, 50%)",
    accentSubtle: "hsl(146, 28%, 86%)",
    calm: "hsl(162, 24%, 77%)",
    gentleGreen: "hsl(139, 22%, 68%)",
    softAmber: "hsl(42, 24%, 75%)",
    crisisBg: "hsl(5, 35%, 93%)",
    crisisText: "hsl(5, 40%, 35%)",
  },
  {
    id: "lavender",
    name: "Low Lavender",
    description: "Muted violet, quiet and spacious.",
    swatch: "hsl(251, 25%, 58%)",
    bgBase: "hsl(250, 34%, 97%)",
    bgSurface: "hsl(250, 28%, 93%)",
    bgSubtle: "hsl(249, 23%, 88%)",
    bgMuted: "hsl(248, 18%, 82%)",
    textPrimary: "hsl(250, 15%, 24%)",
    textSecondary: "hsl(249, 11%, 43%)",
    textTertiary: "hsl(248, 8%, 61%)",
    accent: "hsl(251, 25%, 58%)",
    accentSubtle: "hsl(250, 34%, 88%)",
    calm: "hsl(225, 30%, 81%)",
    gentleGreen: "hsl(150, 16%, 70%)",
    softAmber: "hsl(39, 22%, 75%)",
    crisisBg: "hsl(5, 35%, 93%)",
    crisisText: "hsl(5, 40%, 35%)",
  },
  {
    id: "mist",
    name: "Sea Mist",
    description: "Blue-green, cool and breathable.",
    swatch: "hsl(182, 34%, 48%)",
    bgBase: "hsl(185, 36%, 97%)",
    bgSurface: "hsl(184, 30%, 92%)",
    bgSubtle: "hsl(183, 25%, 87%)",
    bgMuted: "hsl(183, 20%, 81%)",
    textPrimary: "hsl(188, 17%, 22%)",
    textSecondary: "hsl(188, 12%, 40%)",
    textTertiary: "hsl(188, 8%, 58%)",
    accent: "hsl(182, 34%, 48%)",
    accentSubtle: "hsl(181, 36%, 86%)",
    calm: "hsl(196, 34%, 79%)",
    gentleGreen: "hsl(154, 18%, 68%)",
    softAmber: "hsl(40, 22%, 74%)",
    crisisBg: "hsl(5, 35%, 93%)",
    crisisText: "hsl(5, 40%, 35%)",
  },
  {
    id: "rose",
    name: "Warm Rose",
    description: "Gentle rose, kind and soft.",
    swatch: "hsl(350, 31%, 60%)",
    bgBase: "hsl(350, 38%, 97%)",
    bgSurface: "hsl(350, 30%, 93%)",
    bgSubtle: "hsl(349, 25%, 88%)",
    bgMuted: "hsl(348, 19%, 82%)",
    textPrimary: "hsl(350, 16%, 24%)",
    textSecondary: "hsl(349, 12%, 42%)",
    textTertiary: "hsl(348, 8%, 60%)",
    accent: "hsl(350, 31%, 60%)",
    accentSubtle: "hsl(350, 38%, 89%)",
    calm: "hsl(28, 30%, 80%)",
    gentleGreen: "hsl(147, 16%, 70%)",
    softAmber: "hsl(39, 24%, 76%)",
    crisisBg: "hsl(5, 35%, 93%)",
    crisisText: "hsl(5, 40%, 35%)",
  },
];

export function getTheme(themeId: ThemeId | string | undefined): ClearPathTheme {
  return clearPathThemes.find((theme) => theme.id === themeId) ?? clearPathThemes[0];
}

export function createThemeVars(theme: ClearPathTheme) {
  return vars({
    "color-bg-base": theme.bgBase,
    "color-bg-surface": theme.bgSurface,
    "color-bg-subtle": theme.bgSubtle,
    "color-bg-muted": theme.bgMuted,
    "color-text-primary": theme.textPrimary,
    "color-text-secondary": theme.textSecondary,
    "color-text-tertiary": theme.textTertiary,
    "color-accent": theme.accent,
    "color-accent-subtle": theme.accentSubtle,
    "color-calm": theme.calm,
    "color-gentle-green": theme.gentleGreen,
    "color-soft-amber": theme.softAmber,
    "color-crisis-bg": theme.crisisBg,
    "color-crisis-text": theme.crisisText,
  });
}
