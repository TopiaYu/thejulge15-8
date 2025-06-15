'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMyStoreNoticeStore } from './store/MyStoreNoticesStore';
import MyJobPost from './MyJobPost';
import { useShopDetailStore } from './store/ShopDetailStore';

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
  body?: {
    hourlyPay?: number;
    startsAt?: string;
    workhour?: number;
    description?: string;
    name?: string;
    category?: string;
    address1?: string;
    address2?: string;
    imageUrl?: string;
    originalHourlyPay?: number;
  };
}

interface GetNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: NoticeListItem[];
  links: LinkItem[];
}

// 가게 정보 상세 의 타입
interface UserProfile {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface ShopDetail {
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

interface RegisteredJobProps {
  shopId: string;
}

export default function RegisteredJob({ shopId }: RegisteredJobProps) {
  const router = useRouter();
  const {
    shopItem,
    isLoading: isShopLoading,
    error: shopError,
    fetchShopDetail,
  } = useShopDetailStore();

  const { notices, totalCount, isLoading, error, hasMore, fetchNotices, clearNotices } =
    useMyStoreNoticeStore();

  useEffect(() => {
    if (shopId) {
      fetchShopDetail(shopId);
      fetchNotices(shopId, false);
    }
    return () => {
      clearNotices();
    };
  }, [shopId, fetchShopDetail, fetchNotices, clearNotices]);

  const handleButton = () => {
    router.push('/owner/register-job');
  };

  if (isLoading && notices.length === 0) {
    return <div>공고 목록 불러오는 중 ...</div>;
  }

  if (error) {
    return <div>공고를 불러오지 못했습니다</div>;
  }

  if (notices.length === 0 && !isLoading && totalCount === 0) {
    return (
      <div className="bg-gray-5 py-15">
        <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl max-[374px]:text-lg font-bold">등록한 공고</h1>
          </header>
          <div className="w-full border border-gray-20 gap-6 py-15 rounded-2xl flex flex-col justify-center items-center">
            <p className="">공고를 등록해 보세요.</p>
            <button
              className="cursor-pointer px-3 hover:bg-orange-700 transition-colors duration-300 ease-in-out custom-button w-[120px] sm:w-[346px] h-[47px] bg-orange text-white rounded-md"
              onClick={handleButton}
            >
              공고 등록하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-5 py-15">
      <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl max-[374px]:text-lg font-bold">내가 등록한 공고</h1>
        </header>
        <div className="grid grid-cols-1 md: grid-cols-2 lg: grid-cols-3 gap-4">
          {notices.map((notice) => (
            <MyJobPost
              key={notice.id}
              notice={notice}
              shopId={shopId}
              shopName={shopItem?.name || ''}
              shopAddress={shopItem?.address1 || ''}
              shopImageUrl={shopItem?.imageUrl || ''}
              originalHourlyPay={shopItem?.originalHourlyPay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
