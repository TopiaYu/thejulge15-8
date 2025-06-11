import { create } from 'zustand';
import { LoginResponse } from '../../types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  userData: LoginResponse | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      login: (userData: LoginResponse) => set({ userData }),
      logout: () => set({ userData: null }),
    }),
    {
      name: 'auth-data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuth;
