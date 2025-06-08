'use client';

import Image from 'next/image';

export default function StoreDetail() {
  const handleButton = () => {
    return console.log('dd');
  };

  return (
    <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto">
      <header className="mt-15 mb-6">
        <h3 className="text-base text-orange font-bold">식당</h3>
        <h1 className="text-2xl font-bold">도토리 식당</h1>
      </header>
      <div
        className="w-full border border-gray-20 grid grid-cols-1 gap-8 p-6 rounded-xl
                    md:grid-cols-[1fr_minmax(0,346px)]"
      >
        <div className="w-full min-h-[308px] border-0 rounded-xl bg-amber-700">
          <img />
        </div>
        <div className="mt-4">
          <h3 className="text-base text-orange font-bold">시급</h3>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-bold mt-2">15,000원</h2>
            <div className="flex bg-orange text-white border-0 rounded-4xl px-3 py-2">
              <p>기존 시급보다 50%</p>
              <Image
                src="/arrow-up-bold.png"
                width={16}
                height={16}
                className="sm:w-5 sm:h-5"
                alt=""
              />
            </div>
          </div>
          <div className="flex gap-1.5 mt-3">
            <Image
              src="/clock-icon.png"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5"
              alt="time"
            />
            <p>날짜 및 시간</p>
          </div>
          <div className="flex gap-1.5 mt-3">
            <Image
              src="/location-icon.png"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5"
              alt="location"
            />
            <p>위치</p>
          </div>
          <p className="mt-3 min-h-[78px]">
            알바하기 편한 너구리네 라면집! <br />
            라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다.
          </p>
          <div className="flex justify-center mt-3 w-full">
            <button
              className="cursor-pointer border px-1 w-full py-3.5 text-orange font-bold border-orange rounded-md"
              onClick={handleButton}
            >
              공고 편집하기
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-10 rounded-xl p-8 mt-6 mb-15">
        <h3 className="font-bold mb-3">공고 설명</h3>
        <p>
          기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요. 급해서 시급도
          높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요.
        </p>
      </div>
    </div>
  );
}
