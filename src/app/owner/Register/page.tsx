'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/owner/register-store');
  };

  return (
    <div className="w-full xl:px-[208px] md:px-16 sm:px-8 px-5 md:pt-0 pt-[18px]">
      <div className="w-full mt-16">
        <div className="text-2xl text-[#111322] font-extrabold">내 가게</div>
        <div className="w-full mt-4 h-[217px] border border-solid border-gray-200 rounded-[12px] flex flex-col items-center justify-center">
          <div className="font-normal text-base text-center mb-2">
            내 가게를 소개하고 공고도 등록해 보세요.
          </div>
          <button
            onClick={handleClick}
            className="cursor-pointer hover:bg-orange-700 transition-colors duration-300 ease-in-out custom-button w-[108px] sm:w-[346px] h-[47px] bg-orange text-white rounded-md"
          >
            가게 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
