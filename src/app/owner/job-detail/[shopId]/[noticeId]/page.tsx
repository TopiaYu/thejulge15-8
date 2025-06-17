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
