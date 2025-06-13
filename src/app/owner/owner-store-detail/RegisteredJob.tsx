'use client';

import { useRouter } from 'next/navigation';

export default function RegisteredJob() {
  const router = useRouter();
  const handleButton = () => {
    router.push('/owner/register-job');
  };
  return (
    <div className="bg-gray-5 py-15">
      <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl max-[374px]:text-lg font-bold">내 가게</h1>
        </header>
        <div className="w-full border border-gray-20 gap-6 py-15 rounded-2xl flex flex-col justify-center items-center">
          <p className="">공고를 등록해 보세요.</p>
          <button
            className="cursor-pointer px-3 hover:bg-orange-700 transition-colors duration-300 ease-in-out custom-button w-[120px] sm:w-[346px] h-[47px] bg-orange text-white rounded-md"
            onClick={handleButton}
          >
            공고 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
