'use client';

import { useState, useEffect } from 'react';
import Filter from '@/components/notice/filter';
import DetailFilter from '@/components/notice/detailfilter';
import axios from '@/lib/api/axios';

interface Job {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Shop;
}
interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export default function JobList() {
  const [jobList, setJobList] = useState<Job[]>([]);
  useEffect(() => {
    bringData();
  }, []);
  async function bringData() {
    try {
      const response = await axios.get('/notices', {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMzgxYjNiYy0xOTFhLTQ2ODEtOWZlMy05ZmFkYzQ4NGFkOGQiLCJpYXQiOjE3NDk0NTc5OTZ9.443I9RQURayX-cQahXmXj0L7cUHKVoifWdibO0_Pj7w`, // 보통 "Bearer " 접두사가 필요합니다!
        },
      });
      console.log('응답 데이터:', response.data);
      setJobList(response.data.items);
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  }
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
            {jobList.map((item) => (
              <div
                key={item.id}
                className="w-[312px] h-[349px] p-[14px] bg-white border border-gray-20 rounded-xl"
              >
                <div>{item.shop.name}</div>
                <div>{item.description}</div>
                <div>{item.hourlyPay}원</div>
              </div>
            ))}
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
