'use client';

import { useEffect, useState } from 'react';
import { useSortOption, useDetailOption } from '@/lib/hooks/zustand';

import NoticeCard from '@/components/notice-detail/NoticeCard';
import Filter from '@/components/notice/filter';
import DetailFilter from '@/components/notice/detailfilter';
import Pagination from '@/components/member/myprofile/Pagination';
import { NoticeItem, ShopItem } from '@/types/types';

import Image from 'next/image';
import axios from '@/lib/api/axios';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import MySpinner from '@/components/common/Spinner';

// 정렬값 변환
const convertSortToQuery = (sort: string): string | undefined => {
  switch (sort) {
    case '마감 임박 순':
      return 'time';
    case '시급 많은 순':
      return 'pay';
    case '시간 적은 순':
      return 'hour';
    case '가나다 순':
      return 'shop';
    default:
      return undefined;
  }
};

// API 요청
const fetchNotices = async (params: {
  offset?: number;
  limit?: number;
  sort?: string;
  address?: string;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
}) => {
  const query = new URLSearchParams();

  if (params.sort) query.append('sort', params.sort);
  if (params.address) query.append('address', params.address);
  if (params.keyword) query.append('keyword', params.keyword);
  if (params.startsAtGte) query.append('startsAtGte', params.startsAtGte);
  if (params.hourlyPayGte) query.append('hourlyPayGte', params.hourlyPayGte.toString());

  query.append('offset', String(params.offset ?? 0));
  query.append('limit', String(params.limit ?? 8));

  const res = await axios.get(`/notices?${query.toString()}`);
  return res.data;
};

/// API 응답 타입
interface NoticeWithShop {
  item: NoticeItem & {
    shop: {
      item: ShopItem;
    };
  };
}

function ResultPageContent() {
  const searchParams = useSearchParams();
  const { sortOption } = useSortOption();
  const { detailOption } = useDetailOption();

  const keyword = searchParams.get('keyword') || '';
  const [noticeList, setNoticeList] = useState<NoticeWithShop[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await fetchNotices({
          keyword,
          sort: convertSortToQuery(sortOption),
          address: detailOption.location[0],
          startsAtGte: detailOption.startDay ?? undefined,
          hourlyPayGte: detailOption.pay,
          offset: (currentPage - 1) * limit,
          limit,
        });

        setNoticeList(res.items || []);

        setTotalCount(res.count);
      } catch (err) {
        console.error('공고 불러오기 실패:', err);
      }
    };

    getNotices();
  }, [keyword, sortOption, detailOption, currentPage]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="max-w-[964px] w-full min-h-screen flex flex-col lg:mx-auto lg:px-0 md:mx-0 md:px-8 px-[13px] mt-10 ">
      {/* 검색 + 필터 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          {keyword && (
            <p className="text-lg font-bold">
              <span className="text-[#EA3C12]">‘{keyword}’</span>
              <span>에 대한 공고 목록</span>
            </p>
          )}
        </div>
        <div className="flex gap-2 relative z-40">
          <Filter />
          <DetailFilter />
        </div>
      </div>

      {/* 공고 없음 */}
      <div className="flex-grow">
        {noticeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <Image src="/no-result.png" alt="검색 결과 없음" width={300} height={300} />
          </div>
        ) : (
          <>
            {/* 공고 리스트 */}
            <div className="w-full max-w-[1100px] mx-auto mb-7 md:mb-10">
              <ul className="flex flex-wrap items-center gap-x-2 gap-y-4 md:gap-x-3.5 sm:gap-y-8">
                {noticeList.map((notice) => {
                  const { item } = notice;
                  const shop = item.shop.item;

                  return (
                    <NoticeCard
                      key={item.id}
                      info={{
                        shopId: shop.id,
                        noticeId: item.id,
                        closed: item.closed,
                        hourlyPay: item.hourlyPay,
                        startsAt: item.startsAt,
                        workhour: item.workhour,
                        name: shop.name,
                        address1: shop.address1,
                        imageUrl: shop.imageUrl,
                        originalHourlyPay: shop.originalHourlyPay,
                      }}
                    />
                  );
                })}
              </ul>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<MySpinner isLoading={true} />}>
      <ResultPageContent />
    </Suspense>
  );
}
