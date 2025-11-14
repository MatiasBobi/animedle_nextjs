import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/server";
export type CounterDailyAttemps = {
  GameNumber: number;
  animeTitles: string[];
};

export type AnimesNamesList = {
  title: string;
};

export type CounterDailyActions = {
  setGameNumber: (attempts: number) => void;
  setAnimeTitles: (titles: string[]) => void;
};

export type COunterDailyStore = CounterDailyAttemps & CounterDailyActions;

export const useDailyStore = create<COunterDailyStore>()(
  persist(
    (set) => ({
      GameNumber: 1,
      animeTitles: [],
      setGameNumber: (attempts: number) => set({ GameNumber: attempts }),
      setAnimeTitles: (titles: string[]) => set({ animeTitles: titles }),
    }),
    {
      name: "daily-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
