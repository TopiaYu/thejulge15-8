import { create } from 'zustand';

interface SortOptionStore {
  sortOption: string;
  setSortOption: (option: string) => void;
}
interface Filters {
  location: string[];
  startDay: { year: string; month: string; date: string };
  pay: number;
}
interface DetailOptionStore {
  detailOption: Filters;
  setDetailOption: (updater: (prev: Filters) => Filters) => void;
}
export const useSortOption = create<SortOptionStore>((set) => ({
  sortOption: '마감 임박 순',
  setSortOption: (option: string) => set({ sortOption: option }),
}));
export const useDetailOption = create<DetailOptionStore>((set) => ({
  detailOption: {
    location: [],
    startDay: { year: '', month: '', date: '' },
    pay: 0,
  },
  setDetailOption: (updater) =>
    set((state) => ({
      detailOption: updater(state.detailOption),
    })),
}));
