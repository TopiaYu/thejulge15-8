'use client';

import Filter from '@/components/notice/filter';
import DetailFilter from '@/components/notice/detailfilter';

export default function JobList() {
  return (
    <>
      <section className="bg-red-10 flex flex-col justify-center items-center h-[535px]">
        <div className="w-[964px] text-black text-2xl font-bold mb-[31px]">맞춤 공고</div>
        <div className="grid grid-cols-3 gap-[14px]">
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            1
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            2
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            3
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-cols justify-between w-[964px]  mb-[31px] mt-[60px]">
          <div className="text-black text-2xl font-bold">전체 공고</div>
          <div className="flex gap-[10px]">
            <Filter />
            <DetailFilter />
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-x-[14px] gap-y-[31px]">
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            1
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            2
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            3
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            4
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            5
          </div>
          <div className="w-[312px] h-[349px] p-[14px] bg-white border-1 border-gray-20 rounded-xl">
            6
          </div>
        </div>
      </section>
    </>
  );
}
