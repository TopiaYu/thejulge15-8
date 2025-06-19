'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDetailOption } from '@/lib/hooks/zustand';
type Option = {
  location: string[];
  startDay: Date | null;
  pay: number;
};

export default function DetailFilter() {
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectOption, setSelectOption] = useState<Option>({
    location: [],
    startDay: null,
    pay: 0,
  });

  const { detailOption, setDetailOption } = useDetailOption();
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    <div className="z-1 flex flex-row">
      <div className="relative">
        <button
          onClick={() => setDetailOpen(!detailOpen)}
          className="bg-red-300 rounded-[5px] text-sm text-white font-bold py-[6px] px-[12px] cursor-pointer"
        >
          상세 필터
        </button>

        {detailOpen && (
          <>
            <div
              className="
                flex flex-col gap-[24px]
                fixed inset-0 
                md:absolute        
                md:inset-auto
                md:top-full md:mt-[8px] md:right-0
                md:w-[390px]
                bg-white border border-gray-200 rounded-[10px] shadow-lg
                overflow-y-auto h-full md:h-auto
            "
            >
              <div
                ref={wrapperRef}
                className="flex flex-col gap-[24px] pt-[20px] px-[20px] pb-[20px] overflow-y-auto h-full md:h-auto"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-xl">상세 필터</div>
                  <button
                    className="w-[24px] font-bold hover:bg-gray-100 cursor-pointer"
                    onClick={() => setDetailOpen(false)}
                  >
                    <button
                      className="relative w-[24px] font-bold hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDetailOpen(false)}
                    >
                      <Image alt="닫기버튼" src="/close-icon.png" width={20} height={20} />
                    </button>
                  </button>
                </div>

                {/* 위치 필터 */}
                <div className="flex flex-col gap-[12px]">
                  <div className="text-base">위치</div>
                  <div className="grid gap-x-[61px] gap-y-[20px] grid-cols-2 overflow-y-auto border rounded-md border-gray-200 h-[258px] p-[20px]">
                    {LocationOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setSelectOption((prev) => {
                            const exists = prev.location.includes(option);
                            return {
                              ...prev,
                              location: exists
                                ? prev.location.filter((loc) => loc !== option)
                                : [...prev.location, option],
                            };
                          })
                        }
                        className="text-sm text-left cursor-pointer hover:bg-gray-100 ${
                      selectOption.location.includes(option) ? 'bg-gray-200' : ''
                    }"
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-[8px]">
                    {selectOption.location.map((loc) => (
                      <button
                        key={loc}
                        onClick={() =>
                          setSelectOption((prev) => ({
                            ...prev,
                            location: prev.location.filter((l) => l !== loc),
                          }))
                        }
                        className="flex items-center bg-red-100 gap-[4px] px-[10px] py-[6px] rounded-full text-red-500 font-bold cursor-pointer"
                      >
                        <span>{loc}</span>
                        <span>X</span>
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 시작일 필터 */}
                <div className="grid gap-[8px]">
                  <label>시작일</label>
                  <DatePicker
                    selected={selectOption.startDay}
                    onChange={(date) => {
                      if (!date) return;
                      setSelectOption((prev) => ({
                        ...prev,
                        startDay: date,
                      }));
                    }}
                    dateFormat="yyyy/MM/dd"
                    className="border p-3 border-gray-300 text-gray-700 rounded-md w-full focus:outline-none"
                    placeholderText="입력"
                  />
                </div>

                {/* 금액 필터 */}
                <div className="grid gap-[8px]">
                  <label>금액</label>
                  <div className="flex gap-[12px] items-center">
                    <div className="relative w-[169px]">
                      <input
                        type="number"
                        value={selectOption.pay === 0 ? '' : selectOption.pay}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            setSelectOption((prev) => ({
                              ...prev,
                              pay: 0,
                            }));
                            return;
                          }
                          const num = Number(value);
                          if (!isNaN(num)) {
                            setSelectOption((prev) => ({
                              ...prev,
                              pay: num,
                            }));
                          }
                        }}
                        className="border p-3 border-gray-300 text-gray-700 rounded-md w-full focus:outline-none"
                        placeholder="입력"
                      />

                      <span className="absolute top-1/2 -translate-y-1/2 right-[12px] text-sm">
                        원
                      </span>
                    </div>
                    <label>이상부터</label>
                  </div>
                </div>

                {/* 버튼 */}
                <div className="flex gap-[8px] h-[49px]">
                  <button
                    className="border border-red-500 text-red-500 w-[82px] h-full rounded-md font-bold cursor-pointer"
                    onClick={() => {
                      setSelectOption(() => ({
                        location: [],
                        startDay: null,
                        pay: 0,
                      }));
                    }}
                  >
                    초기화
                  </button>
                  <button
                    className="font-bold bg-red-500 text-white rounded-md w-full h-[48px] cursor-pointer"
                    onClick={() => {
                      console.log(detailOption);
                      setDetailOpen(false);
                      setDetailOption(selectOption);
                    }}
                  >
                    적용하기
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
