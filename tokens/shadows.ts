import { colors } from "./colors";

export const shadows = {
  card: {
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  button: {
    shadowColor: colors.light.shadow,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  selected: {
    shadowColor: colors.light.accent,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
} as const;
