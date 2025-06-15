'use client';

import StoreDetail from '../../StoreDetail';
import ApplicantsTable from '../../ApplicantTable';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useJobPostStore } from '../../stores/jobPostStore';

export default function JobDetail() {
  const params = useParams();
  const shopId = params.shopId as string;
  const noticeId = params.noticeId as string;
  const { jobPostItem, isLoading, error, fetchJobPost, clearJobPost } = useJobPostStore();

  useEffect(() => {
    if (shopId && noticeId) {
      fetchJobPost(shopId, noticeId);
    }

    return () => {
      clearJobPost();
    };
  }, [shopId, noticeId, fetchJobPost, clearJobPost]);

  console.log(`jp`, jobPostItem);

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-xl font-bold">공고 정보를 불러오는 중입니다...</div>
    );
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  if (!jobPostItem) {
    return (
      <div className="text-center mt-20 text-xl text-gray-700 font-bold">
        해당 공고를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <>
      <StoreDetail item={jobPostItem} />
      <ApplicantsTable />
    </>
  );
}

const dummyApiItem = {
  id: 'job-post-xyz-789',
  hourlyPay: 18000, // 이 공고의 시급
  startsAt: '2025-06-15T10:00:00Z', // ISO 8601 형식의 시작 시간
  workhour: 5, // 5시간 근무
  description:
    '저희 라면집에서 주방 보조 및 홀 서빙을 담당할 분을 찾습니다. 친절하고 책임감 있는 분 환영!',
  closed: false,
  shop: {
    item: {
      id: 'shop-abc-123',
      name: '너구리네 라면집', // 가게 이름
      category: '식당', // 가게 카테고리
      address1: '서울시 종로구',
      address2: '관철동 12-34번지',
      description:
        '맛있는 라면과 다양한 분식을 제공하는 아늑한 라면집입니다. 언제나 손님을 환영합니다!', // 가게 설명
      imageUrl:
        'https://images.unsplash.com/photo-1588166524941-e5a9b73673d3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // 가게 이미지 URL
      originalHourlyPay: 12000, // 가게의 원래 시급 (공고 시급과 다를 수 있음)
    },
    href: '/api/shops/shop-abc-123',
  },
};
