import { create } from 'zustand';
import { LoginResponse } from '../../types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  userData: LoginResponse | null;
  isInitialized: boolean;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  initialize: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      isInitialized: false,
      login: (userData: LoginResponse) => set({ userData, isInitialized: true }),
      logout: () => set({ userData: null }),
      initialize: () => set({ isInitialized: true }),
    }),
    {
      name: 'auth-data',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.initialize?.();
      },
    },
  ),
);

export default useAuth;
