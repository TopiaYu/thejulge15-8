'use client';

import { useState, useEffect, useRef } from 'react';
import { useSortOption } from '@/lib/hooks/zustand';

export default function Filter() {
  const [filter, setFilter] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null); // ✅ 모달 감지용 ref
  const filterOptions: string[] = ['마감 임박 순', '시급 많은 순', '시간 적은 순', '가나다 순'];
  const { sortOption, setSortOption } = useSortOption();

  const handleSelectOption = (option: string) => {
    setFilter(false);
    setSortOption(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-[9999]" ref={wrapperRef}>
      <button
        onClick={() => setFilter(!filter)}
        className="relative bg-gray-100 rounded-[5px] text-sm font-bold w-[105px] h-[30px] flex items-center justify-center cursor-pointer"
      >
        {sortOption} ▼
      </button>

      {filter && (
        <div className="absolute top-full mt-[8px] w-[105px] grid grid-row-4 rounded-md border-[1px] border-gray-20 text-sm rounded shadow-lg bg-white">
          {filterOptions.map((option: string) => (
            <button
              key={option}
              onClick={() => handleSelectOption(option)}
              className="block hover:bg-gray-100 w-full cursor-pointer p-[8px]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
