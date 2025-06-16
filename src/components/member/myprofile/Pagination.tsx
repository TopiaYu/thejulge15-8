//페이지 네이션 알바 내프로필 하단
'use client';

import Image from 'next/image';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const MAX_PAGES = 7;
  const pageGroup = Math.floor((currentPage - 1) / MAX_PAGES);
  const startPage = pageGroup * MAX_PAGES + 1;
  const endPage = Math.min(startPage + MAX_PAGES - 1, totalPages);

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center mt-6 items-center gap-2">
      {/* 왼쪽 화살표 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="이전 페이지"
        className="disabled:opacity-50"
      >
        <Image
          src={currentPage === 1 ? '/left-arrow-disabled.png' : '/left-arrow.png'}
          alt="prev"
          width={24}
          height={24}
        />
      </button>

      {/* 페이지 버튼 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded hover:bg-[#f06a50] ${
            currentPage === page ? 'bg-[#FF8D72] text-white' : 'text-[#111322]'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 오른쪽 화살표 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="다음 페이지"
      >
        <Image src="/right-arrow.png" alt="next" width={24} height={24} />
      </button>
    </div>
  );
};

export default Pagination;
