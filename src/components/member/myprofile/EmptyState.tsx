//신청한 공고 내역이 없을 때 보여주는 컴포넌트(공고페이지로 이동하는 버튼 포함)
'use client';

interface EmptyStateProps {
  onClick: () => void;
}

const EmptyState = ({ onClick }: EmptyStateProps) => {
  return (
    <div className="h-[217px] text-center py-10 border border-[#E5E4E7]">
      <p className="text-[#111322] mb-4">아직 신청 내역이 없어요.</p>
      <button
        onClick={onClick}
        className="w-[108px] sm:w-[346px] h-[47px] bg-[#ea3c12] text-white rounded-md hover:bg-orange-700 font-bold text-[14px] lg:text-base"
      >
        공고 보러가기
      </button>
    </div>
  );
};

export default EmptyState;
