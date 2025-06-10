//페이지 네이션 알바 내프로필 하단
'use client';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-[#FF8D72] text-white' : 'bg-white'}`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
