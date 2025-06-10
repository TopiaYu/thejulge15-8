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
          className="focus:outline-none cursor-pointer relative bg-gray-100 rounded-[5px] text-sm font-bold w-[105px] h-[30px] flex items-center justify-center"
        >
          {selectFilter} ▼
        </button>

        {filter && (
          <div className="absolute mt-[8px] w-[105px] grid grid-row-4 rounded-md border-[1px] border-gray-20 text-sm shadow-lg">
            <div className="bg-white w-full mt-[4px] mb-[4px] ">
              {filterOptions.map((option: string) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectFilter(option);
                    setFilter(false);
                  }}
                  className="flex justify-center items-center w-full text-sm py-[8px] px-[12px] text-left hover:bg-gray-30 }"
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
