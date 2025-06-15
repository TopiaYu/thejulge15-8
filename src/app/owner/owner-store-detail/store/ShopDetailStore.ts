import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';
import axios from 'axios';

interface UserProfile {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface ShopDetail {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: {
    item: UserProfile;
    href: string;
  };
}

interface ShopDetailState {
  shopItem: ShopDetail | null;
  isLoading: boolean;
  error: string | null;

  fetchShopDetail: (shopId: string) => Promise<void>;

  clearShopDetail: () => void;
}

export const useShopDetailStore = create<ShopDetailState>((set) => ({
  shopItem: null,
  isLoading: false,
  error: null,

  fetchShopDetail: async (shopId) => {
    set({ isLoading: true, error: null, shopItem: null });
    try {
      const response = await axiosInstance.get<{ item: ShopDetail }>(`/shops/${shopId}`);

      set({
        shopItem: response.data.item,
        isLoading: false,
      });
    } catch (err) {
      console.error(`가게 상세 정보 불러오기 실패 (${shopId}):`, err);
      let errorMessage = '가게 상세 정보 불러오기 실패';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          errorMessage = '인증실패';
        } else if (err.request) {
          errorMessage = '네트워크 오류';
        }
      } else {
        //axios 오류 말고 다른 오류(런타임 오류 등)
        errorMessage = (err as Error).message || '알 수 없는 오류';
      }
      set({ error: errorMessage, isLoading: false });
    }
  },
  clearShopDetail: () => {
    set({ shopItem: null, isLoading: false, error: null });
  },
}));
