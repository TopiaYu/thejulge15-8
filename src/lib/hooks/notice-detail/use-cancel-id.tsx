import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ApplyItem {
  noticeId: string;
  applicationId: string;
}

interface CancelItem {
  user: string;
  apply: ApplyItem[];
}

interface Cancel {
  [key: string]: CancelItem;
}

interface CancelList {
  cancelData: Cancel | null;
  applyItems: (cancelData: Cancel) => void;
  addApplyItems: (user: string, item: ApplyItem) => void;
}

const useCancelId = create<CancelList>()(
  persist(
    (set) => ({
      cancelData: null,
      applyItems: (cancelData: Cancel) => set({ cancelData }),
      addApplyItems: (userId: string, item: ApplyItem) =>
        set((state) => {
          const prev = state.cancelData ?? {};
          const userData = prev[userId];
          const updated: Cancel = {
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
