'use client';

import { useState } from 'react';

type Filters = {
  location: string[];
  startDay: [year: string, month: string, date: string];
  pay: string;
};
type Date = {
  location: string[];
  startDay: { year: string; month: string; date: string };
  pay: string;
};

export default function DetailFilter() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Filters>({
    location: [],
    startDay: { year: '2025', month: '06', date: '07' },
    pay: '',
  });

  const LocationOptions: string[] = [
    '서울시 강남구',
    '서울시 강동구',
    '서울시 강북구',
    '서울시 강서구',
    '서울시 관악구',
    '서울시 광진구',
    '서울시 구로구',
    '서울시 금천구',
    '서울시 노원구',
    '서울시 도봉구',
    '서울시 동대문구',
    '서울시 동작구',
    '서울시 마포구',
    '서울시 서대문구',
    '서울시 서초구',
    '서울시 성동구',
    '서울시 성북구',
    '서울시 송파구',
    '서울시 양천구',
    '서울시 영등포구',
    '서울시 용산구',
    '서울시 은평구',
    '서울시 종로구',
    '서울시 중구',
    '서울시 중랑구',
  ];
  const startYearOptions = ['2025', '2026', '2027', '2028', '2029', '2030'];
  const startMonthOptions = ['1', '2', '3', '4', '5', '6', 7, 8, 9, 10, 11, 12];
  const startDateOptions = ['1', '2026', '2027', '2028', '2029', '2030'];
  return (
    <>
      <div className="flex flex-row">
        <div className="grid grid-cols-2 gap-[10px]">
          <div className="relative">
            <button
              onClick={() => setDetailOpen(!detailOpen)}
              className="bg-red-300 rounded-[5px] text-sm text-white font-bold pt-[6px] pb-[6px] pr-[12px] pl-[12px]"
            >
              상세 필터
            </button>

            {detailOpen && (
              <div className="absolute w-[390px] pt-[20px] pr-[20px] pl-[20px] top-full right-0 bg-white border-gray-20 border-[1px] rounded-[10px] shadow-lg  top-full">
                <div className="pb-[20px] flex justify-between">
                  <div className="font-bold text-xl">상세 필터</div>
                  <button
                    className="w-[24px] font-bold hover:bg-gray-100"
                    onClick={() => setDetailOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="">위치</div>
                <div className="grid grid-cols-2">
                  {LocationOptions.map((option) => (
                    <div key={option} className="">
                      <button
                        onClick={() => {
                          setSelected((prev) => {
                            const alreadySelected = prev.location.includes(option);
                            return {
                              ...prev,
                              location: alreadySelected
                                ? prev.location.filter((loc) => loc !== option)
                                : [...prev.location, option],
                            };
                          });
                        }}
                        className={`hover:bg-gray-100 ${
                          selected.location.includes(option) ? 'bg-gray-200' : ''
                        }`}
                      >
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="">위치</div>
                <div className="">
                  {selected.location.map((loc) => (
                    <div key={loc}>
                      <span>{loc}</span>
                      <button
                        onClick={() => {
                          setSelected((prev) => ({
                            ...prev,
                            location: prev.location.filter((l) => l !== loc),
                          }));
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
