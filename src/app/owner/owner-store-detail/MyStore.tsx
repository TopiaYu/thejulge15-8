'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// 등록된 가게 정보의 타입 정의
interface ShopData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export default function MyStore() {
  const [shop, setShop] = useState<ShopData | null>(null);

  useEffect(() => {
    // localStorage에서 가게 정보 불러오기
    const storedShop = localStorage.getItem('registeredShop');
    if (storedShop) {
      setShop(JSON.parse(storedShop));
    }
  }, []);

  const handleButton = () => {
    // 이 버튼에 대한 실제 동작을 정의하세요.
    // 예를 들어, 가게 정보를 편집하는 페이지로 이동하거나 모달을 열 수 있습니다.
    console.log('버튼 클릭됨');
  };

  if (!shop) {
    // 가게 정보가 없을 때 표시할 내용
    return (
      <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto mb-15">
        <header className="mt-15 mb-6">
          <h1 className="text-2xl max-[374px]:text-lg font-bold">내 가게</h1>
        </header>
        <div className="text-center text-gray-500 py-20 border border-gray-20 rounded-2xl">
          등록된 가게 정보가 없습니다.
          <br />
          새로운 가게를 등록해보세요!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto mb-15">
      <header className="mt-15 mb-6">
        <h1 className="text-2xl max-[374px]:text-lg font-bold">내 가게</h1>
      </header>
      <div
        className="w-full border border-gray-20 grid grid-cols-1 gap-8 p-6 rounded-2xl
                    md:grid-cols-[1fr_minmax(0,346px)]" // bg-red-10 제거, 원래 스타일 유지
      >
        <div className="w-full min-h-[308px] border-0 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
          {shop.imageUrl ? (
            <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">이미지 없음</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <h3 className="text-base max-[374px]:text-sm text-orange font-bold">{shop.category}</h3>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl max-[374px]:text-xl font-bold mt-2">{shop.name}</h2>
          </div>

          <div className="flex gap-1.5 mt-3">
            <span className="flex items-center">
              <Image
                src="/location-icon.png" // 이미지 경로 확인 및 필요시 수정
                width={16}
                height={16}
                className="min-[375px]:w-5 min-[375px]:h-5"
                alt="location"
              />
            </span>
            <p className="text-gray-50 text-base max-[374px]:text-sm">
              {shop.address1} {shop.address2}
            </p>
          </div>
          <p className="mt-3 min-h-[78px] text-base max-[374px]:text-sm mb-auto">
            {shop.description || '가게 설명이 없습니다.'}
          </p>
          <div className="flex justify-center mt-3 w-full gap-2">
            <button
              className="cursor-pointer border px-1 w-full py-3.5 text-orange text-base max-[374px]:text-sm font-bold bg-white border-orange rounded-md"
              onClick={handleButton} // "공고 편집하기"
            >
              공고 편집하기
            </button>
            <button
              className="cursor-pointer border px-1 w-full py-3.5 text-white text-base max-[374px]:text-sm font-bold bg-orange rounded-md"
              onClick={handleButton} // 다른 버튼 (예: "공고 삭제하기" 또는 다른 기능)
            >
              공고 관리하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
