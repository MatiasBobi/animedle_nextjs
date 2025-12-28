import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SupabaseClient, User } from '@supabase/supabase-js';
import { getBrowserSupabase } from '@/lib/supabase/client';


interface AuthState {
  user: User | null;
  supabase: SupabaseClient | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  initializeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  supabase: null,
  isLoading: true,
  isInitialized: false,

  setUser: (user) => set({ user }),

  initializeAuth: async () => {
    try {
      const client = await getBrowserSupabase();
      
      if (get().isInitialized) {
        return;
      }
      //  Aca traemos el usuario
      const { data: { user } } = await client.auth.getUser();
      
      set({ 
        user,
        supabase: client,
        isLoading: false,
        isInitialized: true,
      });

      // Escuchamos cuando cambie el estado de autenticación
      const { data: { subscription } } = client.auth.onAuthStateChange(
        async (event, session) => {
          set({ user: session?.user ?? null });
        }
      );

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error al iniciar la autenticación: ', error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  signOut: async () => {
    const { supabase } = get();
    if (supabase) {
      await supabase.auth.signOut();
      set({ user: null, isInitialized: false });
    }
  },
}));