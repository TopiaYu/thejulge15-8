import { create } from 'zustand';

interface SortOptionStore {
  sortOption: string;
  setSortOption: (option: string) => void;
}

export const useSortOption = create<SortOptionStore>((set) => ({
  sortOption: '마감 임박 순',
  setSortOption: (option: string) => set({ sortOption: option }),
}));
