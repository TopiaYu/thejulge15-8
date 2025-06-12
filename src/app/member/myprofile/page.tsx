// 알바님 마이프로필 페이지
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyProfileCard from '@/components/member/myprofile/MyProfileCard';
import ApplyHistory from '@/components/member/myprofile/ApplyHistory';
import NoticePopup from '@/components/member/myprofile/NoticePopup';
import EmptyState from '@/components/member/myprofile/EmptyState';

const mockApplyData = [
  {
    id: 1,
    title: '너구리네 라면가게',
    date: '2023-10-01 10:00 - 12:00 (2시간)',
    status: '승인 완료',
    hourlyPay: '10,000원',
  },
  {
    id: 2,
    title: '자두 복숭아 수박',
    date: '2023-10-01 10:00 - 12:00 (2시간)',
    status: '승인 완료',
    hourlyPay: '10,000원',
  },
  {
    id: 3,
    title: '햄부기네 햄버거',
    date: '2023-10-01 10:00 - 12:00 (2시간)',
    status: '거절',
    hourlyPay: '10,000원',
  },
  {
    id: 4,
    title: '김볶천국',
    date: '2023-10-01 10:00 - 12:00 (2시간)',
    status: '대기중',
    hourlyPay: '10,000원',
  },
  {
    id: 5,
    title: '다이어트 건강식단',
    date: '2023-10-01 10:00 - 12:00 (2시간)',
    status: '대기중',
    hourlyPay: '10,000원',
  },
];

const dummyNotices = [
  { message: 'HS 과일주스 공고 지원이 승인되었습니다.', timeAgo: '1분 전' },
  { message: '써니 브런치 공고 지원이 승인되었습니다.', timeAgo: '3분 전' },
  { message: '수리 에스프레소 공고 지원이 거절되었습니다.', timeAgo: '7분 전' },
];

const Page = () => {
  const [showNotice, setShowNotice] = useState(true); //디자인 확인하려고 true로 설정
  const router = useRouter();

  const handleClick = () => {
    router.push('/notice');
  };

  const hasApplied = mockApplyData.length > 0;

  return (
    <div className="w-full">
      {/* 상단 섹션: 내 프로필 */}
      <section className="w-full bg-white pt-6 pb-12">
        <div className="px-4 sm:px-6 lg:px-20 max-w-[1200px] mx-auto  gap-6">
          <div className="flex flex-col lg:flex-row justify-between items-start">
            {/* 왼쪽: 제목 */}
            <div>
              <h2 className="text-[28px] font-bold">내 프로필</h2>

              {showNotice && (
                <div className="mt-4">
                  <NoticePopup notices={dummyNotices} onClose={() => setShowNotice(false)} />
                </div>
              )}
            </div>

            {/* 오른쪽: 카드 */}
            <MyProfileCard
              name="강아지"
              phone="010-1234-5678"
              address="서울시 마포구 멍멍동"
              bio="성실하고 밝은 성격입니다!"
              onEdit={() => router.push('/member/register')}
            />
          </div>
        </div>
      </section>

      {/* 하단 섹션: 신청 내역 */}
      <section className="w-full bg-[#F9F9F9] py-16">
        <div className="px-4 sm:px-6 lg:px-20 max-w-[1200px] mx-auto">
          {hasApplied ? (
            <ApplyHistory
              applyData={mockApplyData}
              totalPages={7}
              currentPage={1}
              onPageChange={() => {}}
              onEmptyClick={handleClick}
            />
          ) : (
            <EmptyState onClick={handleClick} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
