'use client';

import Image from 'next/image';

export default function JobPostFormPage() {
  const handleButton = () => {
    return console.log('click');
  };

  return (
    <div className="w-full max-w-[964px] p-8 max-[375px]:p-4 flex flex-col justify-center mx-auto">
      <header className="flex justify-between mb-8">
        <h1 className="text-lg sm:text-2xl font-bold">공고등록</h1>
        <button className="cursor-pointer">
          <Image src="/closeIcon.png" width={24} height={24} className="sm:w-8 sm:h-8" alt="exit" />
        </button>
      </header>

      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">시급</label>
            <div className="relative w-full">
              <input
                id="wage"
                type="number"
                placeholder="10,000"
                className="p-3 border border-solid border-gray-300 rounded-md w-full
                            appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-50 pointer-events-none">
                원
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">시작 일시</label>
            <input
              id="start-date"
              type="date"
              placeholder="2020-02-04"
              className="p-3 border border-solid border-gray-300 text-gray-50 rounded-md w-full"
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">업무 시간</label>
            <div className="relative">
              <input
                id="working-time"
                type="number"
                placeholder="6"
                className="p-3 border border-solid border-gray-300 rounded-md w-full
                            appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ></input>
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-50 pointer-events-none">
                시간
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 ">
          <label className="mb-2">공고설명</label>
          <textarea
            id="job-info"
            placeholder="공고에 대한 기본적인 설명을 해주세요"
            className="p-2 border border-solid border-gray-300 rounded-md h-[153px] resize-none"
          ></textarea>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            onClick={handleButton}
            className="cursor-pointer hover:bg-orange-700 transition-colors duration-300 ease-in-out custom-button 
                    w-[351px] h-[48px] max-w-full
                    bg-orange text-white rounded-md"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
