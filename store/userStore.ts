import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeId } from "@/modules/theme/palettes";

export type UserState = {
  quoteSeed: string;
  themeId: ThemeId;
  displayName: string;
  onboardingDone: boolean;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  reminderTime: string | null;
  notificationsOn: boolean;
  setDisplayName: (displayName: string) => void;
  setThemeId: (themeId: ThemeId) => void;
  setReminderTime: (time: string | null) => void;
  completeOnboarding: () => void;
  recordActivity: (date: string) => void;
  setNotificationsOn: (enabled: boolean) => void;
};

function previousIsoDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  parsed.setDate(parsed.getDate() - 1);
  return parsed.toISOString().slice(0, 10);
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      quoteSeed: Math.random().toString(36).slice(2),
      themeId: "sky",
      displayName: "",
      onboardingDone: false,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      reminderTime: null,
      notificationsOn: true,
      setDisplayName: (displayName) => set({ displayName }),
      setThemeId: (themeId) => set({ themeId }),
      setReminderTime: (reminderTime) => set({ reminderTime }),
      completeOnboarding: () => set({ onboardingDone: true }),
      setNotificationsOn: (notificationsOn) => set({ notificationsOn }),
      recordActivity: (date) =>
        set((state) => {
          if (state.lastActiveDate === date) {
            return state;
          }
          const continued = state.lastActiveDate === previousIsoDate(date);
          const currentStreak = continued ? state.currentStreak + 1 : 1;
          return {
            currentStreak,
            longestStreak: Math.max(state.longestStreak, currentStreak),
            lastActiveDate: date,
          };
        }),
    }),
    {
      name: "clearpath.user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
