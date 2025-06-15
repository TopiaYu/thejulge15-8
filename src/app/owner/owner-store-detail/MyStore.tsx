'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MyStore() {
  const router = useRouter();
  const handleButton = () => {
    router.push('/owner/register-job');
  };

  return (
    <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto mb-15">
      <header className="mt-15 mb-6">
        <h1 className="text-2xl max-[374px]:text-lg font-bold">내 가게</h1>
      </header>
      <div
        className="w-full border border-gray-20 grid grid-cols-1 gap-8 p-6 rounded-2xl
                    md:grid-cols-[1fr_minmax(0,346px)] bg-red-10"
      >
        <div className="w-full min-h-[308px] border-0 rounded-xl bg-amber-700">
          <img />
        </div>
        <div className="mt-4 flex flex-col">
          <h3 className="text-base max-[374px]:text-sm text-orange font-bold">식당</h3>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl max-[374px]:text-xl font-bold mt-2">도토리 식당</h2>
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
            <p className="text-gray-50 text-base max-[374px]:text-sm">위치</p>
          </div>
          <p className="mt-3 min-h-[78px] text-base max-[374px]:text-sm mb-auto">
            알바하기 편한 너구리네 라면집! <br />
            라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.
          </p>
          <div className="flex justify-center mt-3 w-full gap-2">
            <button
              className="cursor-pointer border px-1 w-full py-3.5 text-orange text-base max-[374px]:text-sm font-bold bg-white border-orange rounded-md"
              onClick={handleButton}
            >
              공고 편집하기
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
