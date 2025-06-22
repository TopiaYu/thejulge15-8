'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// 가게 정보 타입 정의
interface Shop {
  id?: string;
  imageUrl?: string;
  category?: string;
  name?: string;
  address1?: string;
  address2?: string;
  description?: string;
  originalHourlyPay?: number;
  user?: {
    item: {
      id: string;
      email: string;
      type: string;
    };
    href: string;
  };
}

const Page = () => {
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);

  // localStorage에서 등록된 가게 정보 가져오기
  useEffect(() => {
    const registeredShop = localStorage.getItem('registeredShop');
    const token = localStorage.getItem('accessToken'); // 예시로 token 사용
    console.log('localStorage registeredShop:', registeredShop); // 디버깅 로그
    console.log('localStorage accessToken:', token); // 디버깅 로그
    if (registeredShop && token) {
      const shopData = JSON.parse(registeredShop);
      // 간단한 사용자 인증 확인 (실제로는 백엔드 API 호출로 검증 필요)
      setShop(shopData);
    } else {
      setShop(null); // 데이터가 없거나 토큰이 없으면 null로 설정
      if (registeredShop) {
        console.log('Removing invalid registeredShop due to missing token');
        localStorage.removeItem('registeredShop'); // 유효하지 않은 데이터 삭제
      }
    }
  }, []);

  const handleRegisterClick = () => {
    router.push('/owner/register-store');
  };

  const handleEditClick = () => {
    // 이름 변경: handleButton -> handleEditClick
    if (shop) {
      // 편집할 가게 정보를 localStorage에 임시 저장하여 register-store 페이지로 전달
      localStorage.setItem('editingShopData', JSON.stringify(shop));
      router.push('/owner/register-store?editMode=true'); // 쿼리 파라미터 추가하여 편집 모드임을 알림
    }
  };

  // 디버깅용 로그
  console.log('Current shop state:', shop);

  return (
    <div className="w-full h-screen xl:px-[208px] md:px-16 sm:px-8 px-5 md:pt-0 pt-[18px]">
      <div className="w-full mt-16">
        <div className="text-2xl text-[#111322] font-extrabold">내 가게</div>
        {shop ? (
          // 등록된 가게가 있을 때 표시할 UI
          <div className="w-full border border-gray-20 grid grid-cols-1 gap-8 p-6 rounded-2xl md:grid-cols-[1fr_minmax(0,346px)]">
            <div className="w-full min-h-[308px] border-0 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
              {shop.imageUrl ? (
                <img
                  src={shop.imageUrl}
                  alt={shop.name || 'Shop'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">이미지 없음</span>
              )}
            </div>
            <div className="mt-4 flex flex-col">
              <h3 className="text-base max-[374px]:text-sm text-orange font-bold">
                {shop.category}
              </h3>
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
                  onClick={handleEditClick} // handleEditClick으로 변경
                >
                  가게 정보 편집하기
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 등록된 가게가 없을 때 표시할 UI
          <div className="w-full mt-4 h-[217px] border border-solid border-gray-200 rounded-[12px] flex flex-col items-center justify-center">
            <div className="font-normal text-base text-center mb-4">
              내 가게를 소개하고 공고도 등록해 보세요.
            </div>
            <button
              onClick={handleRegisterClick}
              className="cursor-pointer hover:bg-orange-700 transition-colors duration-300 ease-in-out custom-button w-[108px] sm:w-[346px] h-[47px] bg-orange text-white rounded-md"
            >
              가게 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
