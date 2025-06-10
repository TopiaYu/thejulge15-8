// ApplyHistory.tsx(공고 신청 내역 컴포넌트)
'use client';

import ApplyTable from './ApplyTable';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

interface ApplyItem {
  id: number;
  title: string;
  status: string;
  date: string;
  hourlyPay: string;
}
interface ApplyHistoryProps {
  applyData: ApplyItem[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEmptyClick: () => void;
}

const ApplyHistory = ({
  applyData,
  totalPages,
  currentPage,
  onPageChange,
  onEmptyClick,
}: ApplyHistoryProps) => {
  const hasApply = applyData.length > 0;

  return (
    <section className="w-full mt-6">
      <h2 className="text-[28px] font-bold text-[#111322] mb-4">신청 내역</h2>
      {hasApply ? (
        <>
          <ApplyTable data={applyData} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <EmptyState onClick={onEmptyClick} />
      )}
    </section>
  );
};

export default ApplyHistory;
