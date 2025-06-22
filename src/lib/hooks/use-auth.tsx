import { create } from 'zustand';
import { LoginResponse, UserItem } from '../../types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  userData: LoginResponse | null;
  isInitialized: boolean;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  updateUserData: (newUserData: Partial<UserItem>) => void;
  initialize: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      isInitialized: false,
      login: (userData: LoginResponse) => set({ userData, isInitialized: true }),
      logout: () => {
        localStorage.removeItem('registeredShop');
        set({ userData: null });
      },
      updateUserData: (newUserData: Partial<UserItem>) =>
        set((state) => {
          if (!state.userData) return {};
          return {
            userData: {
              ...state.userData,
              item: {
                ...state.userData.item,
                user: {
                  ...state.userData.item.user,
                  item: {
                    ...state.userData.item.user.item,
                    ...newUserData,
                  },
                },
              },
            },
          };
        }),
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
