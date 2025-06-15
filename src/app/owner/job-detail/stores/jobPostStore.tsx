import { create } from 'zustand';
import axoisInstance from '@/lib/api/axios';

interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface JobPostDetailItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
    href: string;
  };
  currentUserApplication?: {
    item: {
      id: string;
      status: 'pending' | 'accepted' | 'rejected' | 'canceled';
      createdAt: string;
    };
  };
}

interface jobPostState {
  jobPostItem: JobPostDetailItem | null;
  isLoading: boolean;
  error: string | null;

  fetchJobPost: (shopId: string, noticeId: string) => Promise<void>;
  clearJobPost: () => void;
}

export const useJobPostStore = create<jobPostState>((set) => ({
  jobPostItem: null,
  isLoading: false,
  error: null,

  fetchJobPost: async (shopId, noticeId) => {
    set({ isLoading: true, error: null, jobPostItem: null });
    try {
      const response = await axoisInstance.get(`/shops/${shopId}/notices/${noticeId}`);
      set({ jobPostItem: response.data.item, isLoading: false });
    } catch {
      console.log('error');
    }
  },
  clearJobPost: () => {
    set({ jobPostItem: null, isLoading: false, error: null });
  },
}));
