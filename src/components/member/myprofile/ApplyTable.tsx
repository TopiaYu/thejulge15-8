'use client';

import clsx from 'clsx';

import { ApplyItem } from '@/types/types';

interface ApplyTableProps {
  data: ApplyItem[];
}
//공고신청 상태 따른 스타일 적용
const getStatusStyle = (status: string) => {
  switch (status) {
    case '승인 완료':
      return 'bg-[#D6EBFF] text-[#007AFF]';
    case '거절':
      return 'bg-[#FFEFEA] text-[#E84025]';
    case '대기중':
      return 'bg-[#D9F5D9] text-[#1A7F37]';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

const ApplyTable = ({ data }: ApplyTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[640px] w-full text-left border border-[#E5E4E7] rounded-lg shadow-sm">
        <thead>
          <tr className="bg-[#FFEBE7] border-[#E5E4E7] h-[50px]">
            <th className="p-2">가게</th>
            <th className="p-2">일자</th>
            <th className="p-2">시급</th>
            <th className="p-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-[#E5E4E7] hover:bg-[#F9F9F9] h-[69px]">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.hourlyPay}</td>
              <td className="p-2">
                <span
                  className={clsx(
                    'text-sm font-bold px-4 py-1 rounded-full inline-block text-center',
                    getStatusStyle(item.status),
                  )}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplyTable;
