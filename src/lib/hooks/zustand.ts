import { create } from 'zustand';

interface SortOptionStore {
  sortOption: string;
  setSortOption: (option: string) => void;
}
interface Filters {
  location: string[];
  startDay: string | null;
  pay: number;
}
interface DetailOptionStore {
  detailOption: Filters;
  setDetailOption: (Option: Filters) => void;
}
export const useSortOption = create<SortOptionStore>((set) => ({
  sortOption: '마감 임박 순',
  setSortOption: (option: string) => set({ sortOption: option }),
}));
export const useDetailOption = create<DetailOptionStore>((set) => ({
  detailOption: {
    location: [],
    startDay: null,
    pay: 0,
  },
  setDetailOption: (option) => set({ detailOption: option }),
}));
