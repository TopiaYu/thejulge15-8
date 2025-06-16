'use client';

import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDetailOption } from '@/lib/zustand';

export default function DetailFilter() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { detailOption, setDetailOption } = useDetailOption();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const unsub = useDetailOption.subscribe(
      (state) => state.detailOption,
      (current) => {
        console.log('📦 detailOption changed:', current);
      },
    );
    return () => unsub();
  }, []);
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

  // 날짜 변경 시 zustand 상태 업데이트
  useEffect(() => {
    if (selectedDate) {
      setDetailOption((prev) => ({
        ...prev,
        startDay: {
          year: String(selectedDate.getFullYear()),
          month: String(selectedDate.getMonth() + 1).padStart(2, '0'),
          date: String(selectedDate.getDate()).padStart(2, '0'),
        },
      }));
    }
  }, [selectedDate, setDetailOption]);

  // 외부 클릭 시 팝업 닫기
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
          <div
            ref={wrapperRef}
            className="flex flex-col gap-[24px] absolute md:w-[390px] mt-[8px] pt-[20px] px-[20px] pb-[20px] top-full right-0 bg-white border border-gray-200 rounded-[10px] shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl">상세 필터</div>
              <button
                className="w-[24px] font-bold hover:bg-gray-100 cursor-pointer"
                onClick={() => setDetailOpen(false)}
              >
                X
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
                      setDetailOption((prev) => {
                        const exists = prev.location.includes(option);
                        return {
                          ...prev,
                          location: exists
                            ? prev.location.filter((loc) => loc !== option)
                            : [...prev.location, option],
                        };
                      })
                    }
                    className={`text-sm text-left cursor-pointer hover:bg-gray-100 ${
                      detailOption.location.includes(option) ? 'bg-gray-200' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-[8px]">
                {detailOption.location.map((loc) => (
                  <button
                    key={loc}
                    onClick={() =>
                      setDetailOption((prev) => ({
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
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                className="border p-3 border-gray-300 text-gray-700 rounded-md w-full focus:outline-none"
                placeholderText="입력"
              />
            </div>

            <hr className="border-gray-200" />

            {/* 금액 필터 */}
            <div className="grid gap-[8px]">
              <label>금액</label>
              <div className="flex gap-[12px] items-center">
                <div className="relative w-[169px]">
                  <input
                    value={detailOption.pay}
                    onChange={(e) =>
                      setDetailOption((prev) => ({
                        ...prev,
                        pay: Number(e.target.value),
                      }))
                    }
                    className="border p-3 border-gray-300 text-gray-700 rounded-md w-full focus:outline-none"
                    placeholder="입력"
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-[12px] text-sm">원</span>
                </div>
                <label>이상부터</label>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-[8px] h-[49px]">
              <button
                className="border border-red-500 text-red-500 w-[82px] h-full rounded-md font-bold cursor-pointer"
                onClick={() => {
                  setDetailOption(() => ({
                    location: [],
                    startDay: { year: '', month: '', date: '' },
                    pay: 0,
                  }));
                  setSelectedDate(null);
                }}
              >
                초기화
              </button>
              <button
                className="font-bold bg-red-500 text-white rounded-md w-full h-[48px] cursor-pointer"
                onClick={() => {
                  console.log(detailOption); // 실제 적용 동작 추가 가능
                  setDetailOpen(false);
                }}
              >
                적용하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
