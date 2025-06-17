//알바님 프로필 페이지(프로필 카드 + 신청한 공고내역)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/use-auth';
import useToken from '@/lib/hooks/use-token';
import axios from '@/lib/api/axios';

import MyProfileCard from '@/components/member/myprofile/MyProfileCard';
import ApplyHistory from '@/components/member/myprofile/ApplyHistory';
import EmptyState from '@/components/member/myprofile/EmptyState';

import type { AxiosResponse } from 'axios';
import type { UserItem, ApplyItem, RawApplication } from '@/types/types'; //주석 풀면 더 추가

const LIMIT = 5; //하단 페이지네이션에서 한 페이지에 보여줄 신청 내역 개수

const statusMap: Record<'pending' | 'accepted' | 'rejected' | 'canceled', string> = {
  accepted: '승인 완료',
  rejected: '거절',
  pending: '대기중',
  canceled: '취소됨',
};

// 시작 날짜 전체 반환 (예: 2023-01-12 10:00)
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(
    2,
    '0',
  )} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

// 종료 시간만 (예: 12:00)
const formatTimeOnly = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const formatApplication = (app: RawApplication): ApplyItem => {
  const start = new Date(app.item.notice.item.startsAt);
  const end = new Date(start.getTime() + app.item.notice.item.workhour * 60 * 60 * 1000);

  return {
    id: Number(app.item.id),
    title: app.item.shop.item.name,
    status: statusMap[app.item.status] || '알 수 없음',
    date: `${formatDate(start)} ~ ${formatTimeOnly(end)} (${app.item.notice.item.workhour}시간)`,
    hourlyPay: `${app.item.notice.item.hourlyPay.toLocaleString()}원`,
  };
};

const Page = () => {
  const router = useRouter();
  const token = useToken();
  const { userData, updateUserData } = useAuth();
  const userId = userData?.item.user.item.id;

  const [profile, setProfile] = useState<UserItem | null>(null);
  const [applications, setApplications] = useState<ApplyItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const hasApplied = applications.length > 0;

  const handlePageChange = (page: number) => setCurrentPage(page);

  // 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || !token) return;
      try {
        const response: AxiosResponse<{ item: UserItem }> = await axios.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data.item);
        updateUserData({
          name: response.data.item.name,
          phone: response.data.item.phone,
          address: response.data.item.address,
          bio: response.data.item.bio,
        });
      } catch (error) {
        console.error('프로필 데이터 가져오기 실패:', error);
      }
    };
    fetchProfile();
  }, [userId, token]);

  //  신청 내역 데이터 가져오기 (현재는 mock)
  useEffect(() => {
    const fetchApplications = async () => {
      if (!userId || !token) return;

      try {
        // 실제 요청 코드 (주석 처리 중)
        /*
        const response: AxiosResponse<ApplicationsResponse> = await axios.get(
          `/users/${userId}/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { offset: (currentPage - 1) * LIMIT, limit: LIMIT },
          }
        );
        */

        // Mock Data로 테스트 중(지원한 공고 목록 페이지네이션 삭제 예정)
        const mockApplications: RawApplication[] = Array.from({ length: 40 }, (_, index) => ({
          item: {
            id: (index + 1).toString(),
            status: ['pending', 'accepted', 'rejected', 'canceled'][index % 4] as
              | 'pending'
              | 'accepted'
              | 'rejected'
              | 'canceled',
            createdAt: new Date().toISOString(),
            shop: {
              item: {
                id: 'shop-' + index,
                name: `가게 ${index + 1}`,
                category: '카페',
                address1: '서울시 어딘가',
                address2: '101호',
                description: '맛있는 카페',
                imageUrl: '',
                originalHourlyPay: 10000 + index * 100,
              },
              href: '',
            },
            notice: {
              item: {
                id: 'notice-' + index,
                hourlyPay: 10000 + index * 100,
                description: '설명',
                startsAt: new Date().toISOString(),
                workhour: 4,
                closed: false,
              },
              href: '',
            },
          },
        }));

        const response = {
          data: {
            items: mockApplications.slice((currentPage - 1) * LIMIT, currentPage * LIMIT),
            count: mockApplications.length,
          },
        };

        setTotalCount(response.data.count);
        setApplications(response.data.items.map(formatApplication));
      } catch (error) {
        console.error('신청 내역 가져오기 실패:', error);
      }
    };

    fetchApplications();
  }, [userId, token, currentPage]);

  const goToNoticePage = () => {
    router.push('/notice');
  };

  return (
    <div className="w-full">
      {/* 상단 섹션 : 냐 프로필*/}
      <section className="w-full bg-white pt-6 pb-12">
        <div className="px-4 sm:px-6 lg:px-20 max-w-[1200px] mx-auto gap-6">
          <div className="flex flex-col lg:flex-row justify-between items-start">
            {/* 왼쪽: 제목 */}
            <div>
              <h2 className="text-[28px] font-bold">내 프로필</h2>
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
              totalPages={Math.ceil(totalCount / LIMIT)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onEmptyClick={goToNoticePage}
            />
          ) : (
            <EmptyState onClick={goToNoticePage} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
