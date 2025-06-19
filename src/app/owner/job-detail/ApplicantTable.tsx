'use client';

import { useEffect, useState } from 'react';
import Pagenation from './pagenation';
import axiosInstance from '@/lib/api/axios';
import useToken from '@/lib/hooks/use-token';
import ModalConfirm from './ModalConfirm';

interface Applicant {
  id: string;
  name?: string;
  introduction?: string;
  phoneNumber?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
}

interface User {
  id: string;
  name?: string;
  phone?: string;
  bio?: string;
}

interface ApplicationItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  user: {
    item: User;
  };
}

interface GetApplicantResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: {
    item: ApplicationItem;
  }[];
}

interface ApplicantTableProps {
  shopId: string;
  noticeId: string;
}

export default function ApplicantsTable({ shopId, noticeId }: ApplicantTableProps) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const token = useToken();
  //모달상태 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [currentApplicantToProcess, setCurrentApplicantToProcess] = useState<Applicant | null>(
    null,
  );
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //신청자 목록 가져오기
  const fetchApplicants = async (page: number) => {
    setLoading(true);
    setError(null);
    const offset = (page - 1) * itemsPerPage;
    try {
      const response = await axiosInstance.get<GetApplicantResponse>(
        `/shops/${shopId}/notices/${noticeId}/applications`,
        {
          params: { offset, limit: itemsPerPage },
        },
      );
      const data = response.data;
      const formatApplicants: Applicant[] = data.items.map((appItem) => ({
        id: appItem.item.id,
        name: appItem.item.user.item.name,
        introduction: appItem.item.user.item.bio,
        phoneNumber: appItem.item.user.item.phone,
        status: appItem.item.status,
      }));
      setApplicants(formatApplicants);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      if (data.count === 0) {
        setTotalPages(1);
      }
    } catch (error) {
      console.error('오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  // 신청자 상태 관리 (누를경우 모달나옴)
  const handleApplicantStatusButton = async (applicant: Applicant, action: 'accept' | 'reject') => {
    setCurrentApplicantToProcess(applicant);
    setActionType(action);
    setModalMessage(`신청을 ${action === 'accept' ? '승인' : '거절'}하시겠어요? `);
    setIsModalOpen(true);
  };
  // 모달에서 api put 하기
  const processApplicationAction = async () => {
    const applicant = currentApplicantToProcess;
    const action = actionType;
    if (!token) {
      alert('인증 토큰이 없습니다.');
      return;
    }

    const newStatus = action === 'accept' ? 'accepted' : 'rejected';
    const actionText = action === 'accept' ? '승인' : '거절';

    try {
      await axiosInstance.put(
        `/shops/${shopId}/notices/${noticeId}/applications/${applicant?.id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(`${actionText}하였습니다.`);
      fetchApplicants(currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setCurrentApplicantToProcess(null);
      setActionType(null);
    }
  };

  useEffect(() => {
    if (shopId && noticeId) {
      fetchApplicants(currentPage);
    }
  }, [shopId, noticeId, currentPage]);

  if (loading) {
    return <div className="w-full max-w-[964px] mx-auto p-6">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto py-15">
      <header className="text-2xl font-bold mb-8">신청자 목록</header>
      <div className="w-full border border-gray-20 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-[#FEF7F6]">
              <th className="px-3.5 py-3 font-normal">신청자</th>
              <th className="px-3.5 py-3 font-normal hidden sm:table-cell">소개</th>
              <th className="px-3.5 py-3 font-normal hidden md:table-cell">전화번호</th>
              <th className="px-3.5 py-3 font-normal">상태</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b border-gray-20">
                  <td className="px-3.5 py-4 w-[90px]">{applicant.name}</td>
                  <td className="px-3.5 py-4 w-[340px] hidden sm:table-cell">
                    <div // 스크롤 스타일을 위해서 div 추가
                      className="overflow-y-auto max-h-12"
                    >
                      {applicant.introduction}
                    </div>
                  </td>
                  <td className="px-3.5 py-4 hidden md:table-cell">{applicant.phoneNumber}</td>
                  <td className="flex items-center h-[90px] px-3.5 py-4 gap-4">
                    {applicant.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApplicantStatusButton(applicant, 'reject')}
                          className="cursor-pointer max-w-[92px] max-h-[38px] border border-orange text-orange font-bold text-sm rounded-lg px-5 py-2.5"
                        >
                          거절하기
                        </button>
                        <button
                          onClick={() => handleApplicantStatusButton(applicant, 'accept')}
                          className="cursor-pointer max-w-[92px] max-h-[38px] border border-blue-20 text-blue-20 font-bold text-sm rounded-lg px-5 py-2.5"
                        >
                          승인하기
                        </button>
                      </>
                    ) : (
                      <span
                        className={`px-2.5 py-1.5 rounded-3xl text-sm font-bold
                        ${applicant.status === 'accepted' ? 'bg-blue-10 text-blue-20' : ''}
                        ${applicant.status === 'rejected' ? 'bg-red-20 text-orange' : ''}
                        ${applicant.status === 'canceled' ? 'bg-gray-40 text-black' : ''}
                      `}
                      >
                        {applicant.status === 'accepted' && '승인 완료'}
                        {applicant.status === 'rejected' && '거절'}
                        {applicant.status === 'canceled' && '취소'}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>신청자가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-4">
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <ModalConfirm
        isOpen={isModalOpen}
        message={modalMessage}
        onConfirm={processApplicationAction}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
