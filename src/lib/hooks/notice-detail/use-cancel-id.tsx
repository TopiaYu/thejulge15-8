import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ApplyItem, CancelData } from '../../../types/types';

interface CancelList {
  cancelData: CancelData | null;
  applyItems: (cancelData: CancelData) => void;
  addApplyItems: (user: string, item: ApplyItem) => void;
}

const useCancelId = create<CancelList>()(
  persist(
    (set) => ({
      cancelData: null,
      applyItems: (cancelData: CancelData) => set({ cancelData }),
      addApplyItems: (userId: string, item: ApplyItem) =>
        set((state) => {
          const prev = state.cancelData ?? {};
          const userData = prev[userId];
          const updated: CancelData = {
            ...prev,
            [userId]: {
              user: userId,
              apply: userData ? [...userData.apply, item] : [item],
            },
          };
          return { cancelData: updated };
        }),
    }),
    {
      name: 'cancel-data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCancelId;
