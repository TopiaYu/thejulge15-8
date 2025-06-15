import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';
import axios from 'axios';

interface NoticeListItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface LinkItem {
  rel: string;
  description: string;
  method: string;
  href: string;
  //   body?: {
  //     // `body`는 POST/PUT 요청에 대한 링크에만 존재하며, 그 내용도 명시
  //     hourlyPay?: number;
  //     startsAt?: string;
  //     workhour?: number;
  //     description?: string;
  //     name?: string;
  //     category?: string;
  //     address1?: string;
  //     address2?: string;
  //     imageUrl?: string;
  //     originalHourlyPay?: number;
  //   };
}

interface GetNoticesResponse {
  offset: number;
  limit: number;
  count: number; // 전체 개수
  hasNext: boolean; // 다음 내용 존재 여부
  items: { item: NoticeListItem; links: LinkItem[] }[];
  links: LinkItem[];
}

interface MyStoreNoticesState {
  notices: NoticeListItem[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  currentPageOffset: number; // 현재 로드된 공고의 시작 위치 (offset)
  hasMore: boolean; // 더 불러올 공고가 있는지 여부 (hasNext)

  fetchNotices: (shopId: string, loadMore: boolean) => Promise<void>;
  clearNotices: () => void;
}

export const useMyStoreNoticeStore = create<MyStoreNoticesState>((set, get) => ({
  notices: [],
  totalCount: 0,
  isLoading: false,
  error: null,
  currentPageOffset: 0,
  hasMore: true,

  fetchNotices: async (shopId, loadMore) => {
    const limit = 6;
    const currentOffset = loadMore ? get().currentPageOffset : 0;
    //중복호출 방지
    if (
      get().isLoading ||
      (!loadMore && get().notices.length > 0) ||
      (loadMore && !get().hasMore)
    ) {
      return;
    }

    set({ isLoading: true, error: null }); // 로딩 시작, 에러 초기화

    try {
      const response = await axiosInstance.get<GetNoticesResponse>(`/shops/${shopId}/notices`, {
        params: {
          offset: currentOffset,
          limit: limit,
        },
      });
      const newNotices = response.data.items.map((itemWrapper) => itemWrapper.item);
      set((state) => ({
        notices: loadMore ? [...state.notices, ...newNotices] : newNotices,
        totalCount: response.data.count,
        currentPageOffset: currentOffset + newNotices.length,
        hasMore: response.data.hasNext,
        isLoading: false,
      }));

      console.log(
        `[MyStoreNoticesStore] 공고 목록 불러오기 성공 (${shopId}, offset: ${currentOffset}):`,
        response.data,
      );
    } catch (err) {
      console.error(
        `[MyStoreNoticesStore] 공고 목록 불러오기 실패 (${shopId}, offset: ${currentOffset}):`,
        err,
      );
      let errorMessage = '공고 목록을 불러오기 실패';
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          // 인증 오류
          errorMessage = '인증 만료';
        } else if (err.response?.data?.message) {
          // 서버 메세지 우선
          errorMessage = (err.response.data as { message?: string }).message || errorMessage;
        } else if (err.request) {
          //네트워크 오류
          errorMessage = '네트워크 연결상태를 확인해보세요';
        } else if (err instanceof Error) {
          // 기타오류
          errorMessage = err.message;
        }
      }
      set({ error: errorMessage, isLoading: false, hasMore: false }); // 에러 시 더 이상 불러올 데이터 없다고 표시
    }
  },
  clearNotices: () => {
    set({
      notices: [],
      totalCount: 0,
      isLoading: false,
      error: null,
      currentPageOffset: 0,
      hasMore: true,
    });
  },
}));
