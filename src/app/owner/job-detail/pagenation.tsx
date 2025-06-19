import React from 'react';
import Image from 'next/image';

interface PagenationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagenation({ currentPage, totalPages, onPageChange }: PagenationProps) {
  const maxPageNumbersToShow = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center gap-2.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 
                    ${currentPage === 1 ? '' : 'cursor-pointer'}
                    }`}
      >
        <Image
          src={currentPage === 1 ? '/left-arrow-disabled.png' : '/left-arrow.png'}
          alt="prev"
          width={24}
          height={24}
        />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-sm cursor-pointer
            ${currentPage === number ? 'bg-red-30 text-white' : 'bg-white'}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 ${currentPage === totalPages ? '' : 'cursor-pointer'}`}
      >
        <Image
          src={currentPage === totalPages ? '/right-arrow-disabled.png' : '/right-arrow.png'}
          alt="next"
          width={24}
          height={24}
        />
      </button>
    </nav>
  );
}
