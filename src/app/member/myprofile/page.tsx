// 알바님 마이프로필 페이지
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/use-auth';
import useToken from '@/lib/hooks/use-token';
import axios from '@/lib/api/axios';

import MyProfileCard from '@/components/member/myprofile/MyProfileCard';
import ApplyHistory from '@/components/member/myprofile/ApplyHistory';
import NoticePopup from '@/components/member/myprofile/NoticePopup';
import EmptyState from '@/components/member/myprofile/EmptyState';

import type { AxiosResponse } from 'axios';
import type { UserItem, ApplyItem, RawApplication } from '@/types/types';

const dummyNotices = [
  { message: 'HS 과일주스 공고 지원이 승인되었습니다.', timeAgo: '1분 전' },
  { message: '써니 브런치 공고 지원이 승인되었습니다.', timeAgo: '3분 전' },
  { message: '수리 에스프레소 공고 지원이 거절되었습니다.', timeAgo: '7분 전' },
];

const Page = () => {
  const router = useRouter();
  const token = useToken();
  const { userData } = useAuth();

  const userId = userData?.item.user.item.id;
  const [profile, setProfile] = useState<UserItem | null>(null);
  const [showNotice, setShowNotice] = useState(true); //디자인 확인하려고 true로 설정

  const [applications, setApplications] = useState<ApplyItem[]>([]);
  const hasApplied = applications.length > 0;

  // 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || !token) return;

      try {
        const response: AxiosResponse<{ item: UserItem }> = await axios.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.item);
      } catch (error) {
        console.error('프로필 데이터 가져오기 실패:', error);
      }
    };

    fetchProfile();
  }, [userId, token]);

  // 신청 내역 데이터 가져오기
  useEffect(() => {
    const fetchApplications = async () => {
      if (!userId || !token) return;

      try {
        const response: AxiosResponse<{ items: RawApplication[] }> = await axios.get(
          `/users/${userId}/applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              offset: 0,
              limit: 5,
            },
          },
        );

        const formatted: ApplyItem[] = response.data.items.map((app: RawApplication): ApplyItem => {
          type ApplicationStatusKey = 'pending' | 'accepted' | 'rejected' | 'canceled';
          const statusMap: Record<ApplicationStatusKey, string> = {
            accepted: '승인 완료',
            rejected: '거절',
            pending: '대기중',
            canceled: '취소됨',
          };

          const start = new Date(app.item.notice.item.startsAt);
          const end = new Date(start.getTime() + app.item.notice.item.workhour * 60 * 60 * 1000);

          const format = (date: Date) =>
            `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
              date.getDate(),
            ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
              date.getMinutes(),
            ).padStart(2, '0')}`;

          return {
            id: Number(app.item.id),
            title: app.item.shop.item.name,
            status: statusMap[app.item.status] || '알 수 없음',
            date: `${format(start)} ~ ${format(end)} (${app.item.notice.item.workhour}시간)`,
            hourlyPay: `${app.item.notice.item.hourlyPay.toLocaleString()}원`,
          };
        });

        setApplications(formatted);
      } catch (error) {
        console.error('신청 내역 가져오기 실패:', error);
      }
    };

    fetchApplications();
  }, [userId, token]);

  const handleClick = () => {
    router.push('/notice');
  };

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
              name={profile?.name || ''}
              phone={profile?.phone || ''}
              address={profile?.address || ''}
              bio={profile?.bio || ''}
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
              applyData={applications}
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
