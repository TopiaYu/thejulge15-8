import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ApplyIdItem, CancelData, ApplyItem } from '../../../types/types';

interface CancelList {
  cancelData: CancelData | null;
  applyItems: (cancelData: CancelData) => void;
  addApplyItems: (user: string, item: ApplyIdItem) => void;
  removeApplyItem: (user: string, itemId: string) => void;
}

const useCancelId = create<CancelList>()(
  persist(
    (set) => ({
      cancelData: null,
      applyItems: (cancelData: CancelData) => set({ cancelData }),
      addApplyItems: (userId: string, item: ApplyIdItem) =>
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
      removeApplyItem: (userId: string, itemId: string) =>
        set((state) => {
          const prev = state.cancelData ?? {};
          const userData = prev[userId];

          if (!userData) return { cancelData: prev };

          const updateApply = userData.apply.filter((item) => item.applicationId !== itemId);

          const updated = {
            ...prev,
            [userId]: {
              ...userData,
              apply: updateApply,
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
