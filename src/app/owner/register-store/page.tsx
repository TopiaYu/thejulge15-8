'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const categories = ['한식', '중식', '일식', '양식', '분식'];

const seoulcity = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구',
];

export default function Page() {
  const router = useRouter(); // Initialize useRouter

  const categoryRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    category: '',
    district: '',
    detailAddress: '',
    basePay: '',
    description: '',
  });

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const handleSelect = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'category') setCategoryOpen(false);
    if (key === 'district') setAddressOpen(false);
  };

  const handleClose = () => {
    router.push('../owner');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setAddressOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="xl:px-[208px] mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">가게 정보</h1>
        <button className="text-2xl cursor-pointer" onClick={handleClose}>
          ✕
        </button>
      </div>

      {/* 가게 이름 & 분류 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm block mb-1">가게 이름*</label>
          <input
            className="w-full border border-[color:var(--color-gray-20)] rounded px-3 py-2"
            placeholder="입력"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="relative" ref={categoryRef}>
          <label className="text-sm block mb-1">분류*</label>
          <button
            className="w-full border border-[color:var(--color-gray-20)] rounded px-3 py-2 text-left flex justify-between items-center"
            onClick={() => setCategoryOpen((prev) => !prev)}
          >
            {form.category || '선택'}
            <ChevronDown className="w-4 h-4" />
          </button>
          {categoryOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-[color:var(--color-gray-20)] rounded shadow max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect('category', cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 주소 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 주소 드롭다운 */}
        <div className="relative" ref={addressRef}>
          <label className="text-sm block mb-1">주소*</label>
          <button
            className="w-full border border-[color:var(--color-gray-20)] rounded px-3 py-2 text-left flex justify-between items-center"
            onClick={() => setAddressOpen((prev) => !prev)}
          >
            {form.district || '선택'}
            <ChevronDown className="w-4 h-4" />
          </button>
          {addressOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-[color:var(--color-gray-20)] rounded shadow max-h-48 overflow-y-auto">
              {seoulcity.map((addr) => (
                <li
                  key={addr}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect('district', addr)}
                >
                  {addr}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="text-sm block mb-1">상세 주소*</label>
          <input
            className="w-full border border-[color:var(--color-gray-20)] rounded px-3 py-2"
            placeholder="입력"
            value={form.detailAddress}
            onChange={(e) => setForm({ ...form, detailAddress: e.target.value })}
          />
        </div>
      </div>

      {/* 기본 시급 */}
      <div className="mb-4">
        <label className="text-sm block mb-1">기본 시급*</label>
        <div className="relative flex items-center w-1/2">
          <input
            className="w-full border border-[color:var(--color-gray-20)] rounded px-3 py-2"
            placeholder="입력"
            value={form.basePay}
            onChange={(e) => setForm({ ...form, basePay: e.target.value })}
          />
          <span className="absolute right-3 text-gray-500">원</span>
        </div>
      </div>

      {/* 이미지 업로드 (UI만) */}
      <div className="mb-4">
        <label className="text-sm block mb-1">가게 이미지</label>
        <div className="w-1/2 h-40 border border-[color:var(--color-gray-20)] rounded flex items-center justify-center bg-gray-100 text-gray-2000 text-sm">
          이미지 추가하기
        </div>
      </div>

      {/* 설명 */}
      <div className="mb-6">
        <label className="text-sm block mb-1">가게 설명</label>
        <textarea
          className="w-full border border-[color:var(--color-gray-20)] rounded px-3 py-2"
          placeholder="입력"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-center">
        <button className="cursor-pointer hover:bg-orange-700 transition-colors duration-300 ease-in-out custom-button w-[108px] sm:w-[346px] h-[47px] bg-orange text-white py-2 rounded">
          등록하기
        </button>
      </div>
    </div>
  );
}
