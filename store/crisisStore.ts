import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DistortionKey } from "@/constants/distortions";
import { StoredEmotion } from "@/modules/db/queries";

export type CrisisStep =
  | "triage"
  | "grounding"
  | "situation"
  | "feelings"
  | "thoughts"
  | "challenge"
  | "balanced"
  | "rerate";

export type CrisisSessionDraft = {
  distressStart: number;
  situation: string;
  emotions: StoredEmotion[];
  automaticThoughts: string;
  distortions: DistortionKey[];
  evidenceFor: string;
  evidenceAgainst: string;
  friendPerspective: string;
  balancedThought: string;
  distressEnd?: number;
  step: CrisisStep;
  groundingCompleted: boolean;
};

type CrisisState = {
  session: CrisisSessionDraft;
  setStep: (step: CrisisStep) => void;
  updateSession: (patch: Partial<CrisisSessionDraft>) => void;
  resetSession: () => void;
};

const blankSession: CrisisSessionDraft = {
  distressStart: 0,
  situation: "",
  emotions: [],
  automaticThoughts: "",
  distortions: [],
  evidenceFor: "",
  evidenceAgainst: "",
  friendPerspective: "",
  balancedThought: "",
  step: "triage",
  groundingCompleted: false,
};

export const useCrisisStore = create<CrisisState>()(
  persist(
    (set) => ({
      session: blankSession,
      setStep: (step) => set((state) => ({ session: { ...state.session, step } })),
      updateSession: (patch) => set((state) => ({ session: { ...state.session, ...patch } })),
      resetSession: () => set({ session: blankSession }),
    }),
    {
      name: "clearpath.crisisSession",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
