import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CounterDailyAttemps = {
  GameNumber: number;
  animeTitles: string[];
  stepsInfo: number[];
  hasHydrated?: boolean;
};

export type AnimesNamesList = {
  title: string;
};

export type CounterDailyActions = {
  setGameNumber: (attempts: number) => void;
  setAnimeTitles: (titles: string[]) => void;
  setStepsInfo: (stepsInfo: number[]) => void;
  updateStepInfo: (index: number, value: number) => void;
};

export type COunterDailyStore = CounterDailyAttemps & CounterDailyActions;

export const useDailyStore = create<COunterDailyStore>()(
  persist(
    (set) => ({
      GameNumber: 1,
      animeTitles: [],
      stepsInfo: [],

      setGameNumber: (attempts: number) => set({ GameNumber: attempts }),
      setAnimeTitles: (titles: string[]) => set({ animeTitles: titles }),
      setStepsInfo: (stepsInfo: number[]) => set({ stepsInfo: stepsInfo }),
      updateStepInfo: (index: number, value: number) =>
        set((state) => {
          const newStepsInfo = [...state.stepsInfo];
          newStepsInfo[index] = value;
          return { stepsInfo: newStepsInfo };
        }),
    }),
    {
      name: "daily-store",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: (state) => {
        state.hasHydrated = true;
      },
    }
  )
);
