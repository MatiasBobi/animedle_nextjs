import { create } from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware'
export type CounterDailyAttemps = {
    GameNumber: number;
}

export type CounterDailyActions = {
    setGameNumber: (attempts: number) => void;
}

export type COunterDailyStore = CounterDailyAttemps & CounterDailyActions
export const useDailyStore = create<COunterDailyStore>()(
  persist(
    (set) => ({
      GameNumber: 1,
      setGameNumber: (attempts: number) => set({ GameNumber: attempts }),
    }),
    {
      name: 'daily-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
