'use client';

interface EmptyStateProps {
  onClick: () => void;
}

const EmptyState = ({ onClick }: EmptyStateProps) => {
  return (
    <div className="text-center py-10">
      <p className="text-[#666] mb-4">신청 내역이 없습니다.</p>
      <button onClick={onClick} className="bg-[#EA3C12] text-white px-4 py-2 rounded-md">
        공고 보러가기
      </button>
    </div>
  );
};

export default EmptyState;
