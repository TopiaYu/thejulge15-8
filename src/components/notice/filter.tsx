'use client';

import { useState } from 'react';
import { useSortOption } from '@/lib/hooks/zustand';

export default function Filter() {
  const [filter, setFilter] = useState(false);
  const filterOptions: string[] = ['마감 임박 순', '시급 많은 순', '시간 적은 순', '가나다 순'];
  const { sortOption, setSortOption } = useSortOption();

  const handleSelectOption = (option: string) => {
    setFilter(false);
    setSortOption(option);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setFilter(!filter)}
          className="z-1 relative bg-gray-100 rounded-[5px] text-sm font-bold w-[105px] h-[30px] flex items-center justify-center cursor-pointer"
        >
          {sortOption} ▼
        </button>

        {filter && (
          <div className="absolute top-full mt-[8px] w-[105px] grid grid-row-4 rounded-md border-[1px] border-gray-20 text-sm rounded shadow-lg">
            <div className="bg-white w-full mt-[4px] mb-[4px]">
              {filterOptions.map((option: string) => (
                <button
                  key={option}
                  onClick={() => {
                    handleSelectOption(option);
                  }}
                  className="block hover:bg-gray-100 w-full cursor-pointer p-[8px]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
