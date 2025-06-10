'use client';

import { useEffect, useState } from 'react';
import Pagenation from './pagenation';

interface Applicant {
  id: string;
  name: string;
  introduction: string;
  phoneNumber: string;
  status: string;
}

export default function ApplicantsTable() {
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allApplicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplicant = allApplicants.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setAllApplicants(mockApplicants);
    setLoading(false);
  }, []);

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
              <th className="px-3.5 py-3 font-normal">소개</th>
              <th className="px-3.5 py-3 font-normal">전화번호</th>
              <th className="px-3.5 py-3 font-normal">상태</th>
            </tr>
          </thead>
          <tbody>
            {currentApplicant.length > 0 ? (
              currentApplicant.map((applicant) => (
                <tr key={applicant.id} className="border-b border-gray-20">
                  <td className="px-3.5 py-4">{applicant.name}</td>
                  <td className="px-3.5 py-4 max-w-[300px]">{applicant.introduction}</td>
                  <td className="px-3.5 py-4">{applicant.phoneNumber}</td>
                  <td className="px-3.5 py-4 flex gap-4">
                    <button
                      onClick={() => alert('거절되었습니다')}
                      className="cursor-pointer border border-orange text-orange font-bold rounded-lg px-5 py-2.5"
                    >
                      거절하기
                    </button>
                    <button
                      onClick={() => alert('승인되었습니다.')}
                      className="cursor-pointer border border-blue-20 text-blue-20 font-bold rounded-lg px-5 py-2.5"
                    >
                      승인하기
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>신청자가 없습니다</div>
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
    </div>
  );
}

export const mockApplicants = [
  {
    id: 'app-1',
    name: '김강현',
    introduction:
      '최선을 다해 열심히 일하겠습니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보이며...',
    phoneNumber: '010-1234-5678',
    status: '거절', // 초기 상태: 거절
  },
  {
    id: 'app-2',
    name: '서혜진',
    introduction: '열심히 하겠습니다!',
    phoneNumber: '010-9876-5432',
    status: '거절', // 초기 상태: 거절
  },
  {
    id: 'app-3',
    name: '주진혁',
    introduction: '성실한 자세로 열심히 일하겠습니다. 한번 경험해 보고 싶어요~',
    phoneNumber: '010-5555-1111',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-4',
    name: '장민혁',
    introduction: '일을 꼼꼼하게 하는 성격입니다. 도토리 식당에서 일해보겠습니다.',
    phoneNumber: '010-2222-3333',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-5',
    name: '고기훈',
    introduction: '하루라도 최선을 다해서 일하겠습니다! 감사합니다.',
    phoneNumber: '010-4444-5555',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-6',
    name: '최은영',
    introduction: '손님들에게 친절하게 응대하며 빠르게 적응할 수 있습니다.',
    phoneNumber: '010-1111-2222',
    status: '대기중',
  },
  {
    id: 'app-7',
    name: '박준형',
    introduction: '경험은 없지만 배우려는 의지가 강합니다.',
    phoneNumber: '010-3333-4444',
    status: '대기중',
  },
  {
    id: 'app-8',
    name: '이지수',
    introduction: '성실함과 꼼꼼함으로 가게에 도움이 되겠습니다.',
    phoneNumber: '010-6666-7777',
    status: '대기중',
  },
  {
    id: 'app-9',
    name: '정민우',
    introduction: '다양한 아르바이트 경험이 있습니다.',
    phoneNumber: '010-8888-9999',
    status: '승인 완료',
  },
  {
    id: 'app-10',
    name: '윤아름',
    introduction: '밝은 미소로 손님을 맞이하겠습니다!',
    phoneNumber: '010-0000-1111',
    status: '대기중',
  },
  {
    id: 'app-11',
    name: '한지원',
    introduction: '장기 근무 가능합니다. 책임감 있게 일하겠습니다.',
    phoneNumber: '010-1212-3434',
    status: '거절',
  },
  {
    id: 'app-12',
    name: '김현우',
    introduction: '빠릿빠릿하게 움직이며 맡은 일을 완수합니다.',
    phoneNumber: '010-5656-7878',
    status: '대기중',
  },
  {
    id: 'app-13',
    name: '이도윤',
    introduction: '긍정적인 마인드로 열심히 배우겠습니다.',
    phoneNumber: '010-9090-0101',
    status: '대기중',
  },
  {
    id: 'app-14',
    name: '김강현',
    introduction:
      '최선을 다해 열심히 일하겠습니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보이며...',
    phoneNumber: '010-1234-5678',
    status: '거절', // 초기 상태: 거절
  },
  {
    id: 'app-15',
    name: '서혜진',
    introduction: '열심히 하겠습니다!',
    phoneNumber: '010-9876-5432',
    status: '거절', // 초기 상태: 거절
  },
  {
    id: 'app-16',
    name: '주진혁',
    introduction: '성실한 자세로 열심히 일하겠습니다. 한번 경험해 보고 싶어요~',
    phoneNumber: '010-5555-1111',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-17',
    name: '장민혁',
    introduction: '일을 꼼꼼하게 하는 성격입니다. 도토리 식당에서 일해보겠습니다.',
    phoneNumber: '010-2222-3333',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-18',
    name: '고기훈',
    introduction: '하루라도 최선을 다해서 일하겠습니다! 감사합니다.',
    phoneNumber: '010-4444-5555',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-19',
    name: '최은영',
    introduction: '손님들에게 친절하게 응대하며 빠르게 적응할 수 있습니다.',
    phoneNumber: '010-1111-2222',
    status: '대기중',
  },
  {
    id: 'app-20',
    name: '박준형',
    introduction: '경험은 없지만 배우려는 의지가 강합니다.',
    phoneNumber: '010-3333-4444',
    status: '대기중',
  },
  {
    id: 'app-21',
    name: '이지수',
    introduction: '성실함과 꼼꼼함으로 가게에 도움이 되겠습니다.',
    phoneNumber: '010-6666-7777',
    status: '대기중',
  },
  {
    id: 'app-22',
    name: '정민우',
    introduction: '다양한 아르바이트 경험이 있습니다.',
    phoneNumber: '010-8888-9999',
    status: '승인 완료',
  },
  {
    id: 'app-23',
    name: '윤아름',
    introduction: '밝은 미소로 손님을 맞이하겠습니다!',
    phoneNumber: '010-0000-1111',
    status: '대기중',
  },
  {
    id: 'app-24',
    name: '한지원',
    introduction: '장기 근무 가능합니다. 책임감 있게 일하겠습니다.',
    phoneNumber: '010-1212-3434',
    status: '거절',
  },
  {
    id: 'app-25',
    name: '김현우',
    introduction: '빠릿빠릿하게 움직이며 맡은 일을 완수합니다.',
    phoneNumber: '010-5656-7878',
    status: '대기중',
  },
  {
    id: 'app-26',
    name: '이도윤',
    introduction: '긍정적인 마인드로 열심히 배우겠습니다.',
    phoneNumber: '010-9090-0101',
    status: '대기중',
  },
  {
    id: 'app-27',
    name: '김강현',
    introduction:
      '최선을 다해 열심히 일하겠습니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보이며...',
    phoneNumber: '010-1234-5678',
    status: '거절', // 초기 상태: 거절
  },
  {
    id: 'app-28',
    name: '서혜진',
    introduction: '열심히 하겠습니다!',
    phoneNumber: '010-9876-5432',
    status: '거절', // 초기 상태: 거절
  },
  {
    id: 'app-29',
    name: '주진혁',
    introduction: '성실한 자세로 열심히 일하겠습니다. 한번 경험해 보고 싶어요~',
    phoneNumber: '010-5555-1111',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-30',
    name: '장민혁',
    introduction: '일을 꼼꼼하게 하는 성격입니다. 도토리 식당에서 일해보겠습니다.',
    phoneNumber: '010-2222-3333',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-31',
    name: '고기훈',
    introduction: '하루라도 최선을 다해서 일하겠습니다! 감사합니다.',
    phoneNumber: '010-4444-5555',
    status: '승인 완료', // 초기 상태: 승인 완료
  },
  {
    id: 'app-32',
    name: '최은영',
    introduction: '손님들에게 친절하게 응대하며 빠르게 적응할 수 있습니다.',
    phoneNumber: '010-1111-2222',
    status: '대기중',
  },
  {
    id: 'app-33',
    name: '박준형',
    introduction: '경험은 없지만 배우려는 의지가 강합니다.',
    phoneNumber: '010-3333-4444',
    status: '대기중',
  },
  {
    id: 'app-34',
    name: '이지수',
    introduction: '성실함과 꼼꼼함으로 가게에 도움이 되겠습니다.',
    phoneNumber: '010-6666-7777',
    status: '대기중',
  },
  {
    id: 'app-35',
    name: '정민우',
    introduction: '다양한 아르바이트 경험이 있습니다.',
    phoneNumber: '010-8888-9999',
    status: '승인 완료',
  },
  {
    id: 'app-36',
    name: '윤아름',
    introduction: '밝은 미소로 손님을 맞이하겠습니다!',
    phoneNumber: '010-0000-1111',
    status: '대기중',
  },
  {
    id: 'app-37',
    name: '한지원',
    introduction: '장기 근무 가능합니다. 책임감 있게 일하겠습니다.',
    phoneNumber: '010-1212-3434',
    status: '거절',
  },
  {
    id: 'app-38',
    name: '김현우',
    introduction: '빠릿빠릿하게 움직이며 맡은 일을 완수합니다.',
    phoneNumber: '010-5656-7878',
    status: '대기중',
  },
  {
    id: 'app-39',
    name: '이도윤',
    introduction: '우아 긍정적인 마인드로 열심히 배우겠습니다.',
    phoneNumber: '010-9090-0101',
    status: '대기중',
  },
];
