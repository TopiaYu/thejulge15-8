// src/app/member/profile/page.tsx
// 내 프로필 상세 페이지(내 프로필 등록하기)
'use client';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/member/register'); // 등록 페이지로 이동
  };

  return (
    <div className="w-full h-screen xl:px-[208px] md:px-16 sm:px-8 px-5 md:pt-0 pt-[18px]">
      <div className="w-full mt-16">
        <h2 className="text-2xl font-extrabold text-[#111322] mb-4">내 프로필</h2>

        <div className="w-full h-[217px] border border-gray-200 rounded-[12px] flex flex-col items-center justify-center text-center px-4">
          <p className="mb-4 text-base text-center whitespace-nowrap">
            내 프로필을 등록하고 원하는 가게에 지원해 보세요.
          </p>
          <button
            onClick={handleClick}
            // className="w-[346px] h-[47px] bg-[#ea3c12] text-white rounded-md hover:bg-orange-700 font-bold"
            className="w-[150px] sm:w-[346px] h-[47px] bg-[#ea3c12] text-white rounded-md hover:bg-orange-700 font-bold text-[14px] lg:text-base"
          >
            내 프로필 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
