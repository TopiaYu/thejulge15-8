// 알바님 마이프로필 페이지

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyProfileCard from '@/components/member/myprofile/MyProfileCard';
import ApplyHistory from '@/components/member/myprofile/ApplyHistory';
import NoticePopup from '@/components/member/myprofile/NoticePopup';
import Pagination from '@/components/member/myprofile/Pagination';
import EmptyState from '@/components/member/myprofile/EmptyState';

const mockApplyData = [
  {
    id: 1,
    title: '너구리네 라면가게',
    date: '2023-10-01 10:00 - 12:00 (2시간)',
    status: '승인 완료',
    hourlyPay: '10,000원',
  },
];

const dummyNotices = ['첫 번째 알림입니다.', '두 번째 알림입니다.', '세 번째 알림입니다.'];

const Page = () => {
  const [showNotice, setShowNotice] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/member/notice');
  };

  const hasApplied = mockApplyData.length > 0;

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-[28px] font-bold">내 프로필</h2>
        {showNotice && <NoticePopup notices={dummyNotices} onClose={() => setShowNotice(false)} />}
      </div>

      {/* 내 프로필 카드 */}
      <MyProfileCard
        name="홀길동"
        phone="010-1234-5678"
        region="서울시 마포구"
        bio="성실하고 밝은 성격입니다!"
        onEdit={() => alert('프로필 편집 페이지로 이동')}
      />

      {/* 신청 내역 */}
      <div className="mt-8">
        {hasApplied ? (
          <>
            <ApplyHistory
              applyData={mockApplyData}
              totalPages={7}
              currentPage={1}
              onPageChange={() => {}}
              onEmptyClick={handleClick}
            />
          </>
        ) : (
          <EmptyState onClick={handleClick} />
        )}
      </div>
    </div>
  );
};

export default Page;
