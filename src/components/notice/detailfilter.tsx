'use client';

import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Filters = {
  location: string[];
  startDay: { year: string; month: string; date: string };
  pay: string;
};

export default function DetailFilter() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Filters>({
    location: [],
    startDay: { year: '', month: '', date: '' },
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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  useEffect(() => {
    if (selectedDate) {
      setSelected((prev) => ({
        ...prev,
        startDay: {
          year: String(selectedDate.getFullYear()),
          month: String(selectedDate.getMonth() + 1).padStart(2, '0'),
          date: String(selectedDate.getDate()).padStart(2, '0'),
        },
      }));
    }
  }, [selectedDate]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (detailOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDetailOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detailOpen]);

  return (
    <>
      <div className="flex flex-row">
        <div className="">
          <div className="relative">
            <button
              onClick={() => setDetailOpen(!detailOpen)}
              className="bg-red-300 rounded-[5px] text-sm text-white font-bold pt-[6px] pb-[6px] pr-[12px] pl-[12px] cursor-pointer"
            >
              상세 필터
            </button>

            {detailOpen && (
              <div
                ref={wrapperRef}
                className="flex flex-col gap-[24px] absolute w-[390px] mt-[8px] pt-[20px] pr-[20px] pl-[20px] pb-[20px] top-full right-0 bg-white border-gray-20 border-[1px] rounded-[10px] shadow-lg"
              >
                <div className="flex justify-between">
                  <div className="font-bold text-xl">상세 필터</div>
                  <button
                    className="w-[24px] font-bold hover:bg-gray-100 cursor-pointer"
                    onClick={() => setDetailOpen(false)}
                  >
                    X
                  </button>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <div className="text-base">위치</div>
                  <div className="grid gap-x-[61px] gap-y-[20px] grid-cols-2 overflow-y-auto border-[1px] rounded-md border-gray-10 h-[258px] p-[20px]">
                    {LocationOptions.map((option) => (
                      <div key={option}>
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
                          } text-sm cursor-pointer`}
                        >
                          {option}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-[8px]">
                    {selected.location.map((loc) => (
                      <button
                        onClick={() => {
                          setSelected((prev) => ({
                            ...prev,
                            location: prev.location.filter((l) => l !== loc),
                          }));
                        }}
                        key={loc}
                        className="flex justify-center items-center bg-red-10 gap-[4px] pt-[6px] pb-[10px] pr-[6px] pl-[10px] rounded-[20px] h-[30px] cursor-pointer"
                      >
                        <span className="text-red-40 font-bold">{loc}</span>
                        <div className="text-red-40 font-bold">X</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="grid gap-[8px]">
                  <label className="mb-[8px]">시작일</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd"
                    className="border p-3 border border-solid border-gray-300 text-gray-50 rounded-md w-full focus:outline-none"
                    placeholderText="입력"
                  />
                </div>

                <div className="border-t border-gray-200" />

                <div className="grid gap-[8px]">
                  <label className="mb-[8px]">금액</label>
                  <div className="flex gap-[12px] items-center">
                    <div className="relative">
                      <input
                        value={selected.pay}
                        onChange={(e) =>
                          setSelected((prev) => ({
                            ...prev,
                            pay: e.target.value,
                          }))
                        }
                        className="border p-3 border border-solid border-gray-300 text-gray-50 rounded-md focus:outline-none w-[169px]"
                        placeholder="입력"
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 right-[12px]">원</span>
                    </div>
                    <label className="">이상부터</label>
                  </div>
                </div>

                <div className="flex gap-[8px] h-[49px]">
                  <button
                    className="border border-red-40 text-red-40 w-[82px] h-full rounded-md font-bold cursor-pointer"
                    onClick={() => {
                      setSelected({
                        location: [],
                        startDay: { year: '', month: '', date: '' },
                        pay: '',
                      });
                      setSelectedDate(null);
                    }}
                  >
                    초기화
                  </button>
                  <button className="font-bold bg-red-40 text-white rounded-md w-[260px] h-[48px] cursor-pointer">
                    적용하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
