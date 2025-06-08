'use client';

import { useState } from 'react';

export default function Filter() {
  const [filter, setFilter] = useState(false);
  const [selectFilter, setSelectFilter] = useState('마감 임박 순');

  const filterOptions: string[] = ['마감 임박 순', '시급 많은 순', '시간 적은 순', '가나다 순'];
  return (
    <>
      <div className="">
        <button
          onClick={() => setFilter(!filter)}
          className="relative bg-gray-100 rounded-[5px] text-sm font-bold w-[105px] h-[30px] flex items-center justify-center"
        >
          {selectFilter} ▼
        </button>

        {filter && (
          <div className="absolute top-full mt-[8px] w-[105px] grid grid-row-4 rounded-md border-[1px] border-gray-20 text-sm rounded shadow-lg">
            <div className="bg-white w-full">
              {filterOptions.map((option: string) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectFilter(option);
                    setFilter(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 w-full"
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
