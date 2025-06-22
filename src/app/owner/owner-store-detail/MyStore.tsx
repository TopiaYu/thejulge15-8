'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

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

  // (추후 로직 변경) 로그아웃하면서 로컬스토리지가 사라질 경우 유저의 id를 반영해서 shop정보 가져오기
  useEffect(() => {
    const storedShop = localStorage.getItem('registeredShop');
    const shopFromAuthData = localStorage.getItem('auth-data');
    if (storedShop) {
      setShop(JSON.parse(storedShop));
    } else if (shopFromAuthData) {
      const authData = JSON.parse(shopFromAuthData);
      const shopDetails = authData?.state?.userData?.item?.user?.item?.shop?.item;
      setShop(shopDetails);
    }
  }, []);

  // useEffect(() => {
  //   const shopFromAuthData = localStorage.getItem('auth-data');
  //   if (shopFromAuthData) {
  //     const authData = JSON.parse(shopFromAuthData);
  //     const shopDetails = authData?.state?.userData?.item?.user?.item?.shop?.item;
  //     setShop(shopDetails);
  //   } else {
  //     console.error();
  //   }
  // }, []);

  const router = useRouter();
  const handleButton = () => {
    router.push('/owner/register-job');
  };

  const handleEditButton = () => {
    if (shop) {
      // 편집할 가게 정보를 localStorage에 임시 저장하여 register-store 페이지로 전달
      localStorage.setItem('editingShopData', JSON.stringify(shop));
      router.push('/owner/register-store?editMode=true'); // 쿼리 파라미터 추가하여 편집 모드임을 알림
    }
  };

  if (!shop) {
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
    <div className="w-full max-w-[1028px] px-8 max-[376px]:px-4 mx-auto mb-15">
      <header className="mt-15 mb-6">
        <h1 className="text-2xl max-[374px]:text-lg font-bold">내 가게</h1>
      </header>
      <div
        className="w-full border border-gray-20 grid grid-cols-1 gap-8 p-6 rounded-2xl bg-red-10
                    md:grid-cols-[1fr_minmax(0,346px)]"
      >
        <div className="w-full aspect-video h-full border-0 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden relative">
          {shop.imageUrl ? (
            <Image
              src={shop.imageUrl}
              alt={shop.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
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
                src="/location-icon.png"
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
              onClick={handleEditButton}
            >
              편집하기
            </button>
            <button
              className="cursor-pointer border px-1 w-full py-3.5 text-white text-base max-[374px]:text-sm font-bold bg-orange rounded-md"
              onClick={handleButton}
            >
              공고 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
