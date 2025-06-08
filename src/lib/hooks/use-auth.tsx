import { create } from 'zustand';
import { LoginResponse } from '../../types/types';

interface AuthState {
  userData: LoginResponse | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => {
  return {
    userData: null,
    login: (userData: LoginResponse) => set({ userData }),
    logout: () => {
      set({ userData: null });
    },
  };
});

export default useAuth;
