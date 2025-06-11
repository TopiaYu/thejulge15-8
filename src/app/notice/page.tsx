'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Filter from '@/components/notice/filter';
import DetailFilter from '@/components/notice/detailfilter';
import axios from '@/lib/api/axios';

interface JobList {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Item;
}
interface dataItem {
  item: JobList;
  links: number;
}
interface Item {
  item: Shop;
  href: string;
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
  const [jobList, setJobList] = useState<JobList[]>([]);
  useEffect(() => {
    bringData();
  }, []);
  async function bringData() {
    const params = {
      limit: 100,
    };
    try {
      const response = await axios.get('/notices', { params });
      console.log('응답 데이터d:', response.data.items);
      const settingData: JobList[] = response.data.items.map((dataItem: dataItem) => ({
        id: dataItem.item.id,
        hourlyPay: dataItem.item.hourlyPay,
        startsAt: dataItem.item.startsAt,
        workhour: dataItem.item.workhour,
        description: dataItem.item.description,
        closed: dataItem.item.closed,
        shop: dataItem.item.shop,
      }));
      setJobList(settingData);
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
        <div className="flex flex-cols justify-between w-[964px] mb-[31px] mt-[60px]">
          <div className="text-black text-2xl font-bold">전체 공고</div>
          <div className="flex gap-[10px]">
            <Filter />
            <DetailFilter />
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-x-[14px] gap-y-[31px]">
          {jobList.map((job) => {
            const originalPay = job.shop.item.originalHourlyPay;
            const currentPay = job.hourlyPay;

            let percentageChange = 0;
            let displayMessage = '';
            let isIncreased = false; // 시급이 인상되었는지 (배경색, 위 화살표)

            // 인상된 경우만 계산하고 표시
            if (originalPay > 0 && currentPay > originalPay) {
              percentageChange = ((currentPay - originalPay) / originalPay) * 100;
              displayMessage = `${Math.round(percentageChange)}%`;
              isIncreased = true;
            }
            // else, if, showArrow 변수 등 불필요한 로직 모두 제거

            return (
              <div
                key={job.id}
                className="w-[312px] h-[349px] p-[14px] bg-white border border-gray-20 rounded-xl"
              >
                {/* <Image src={job.shop.item.imageUrl} alt={job.shop.item.name + " 대표 이미지"} width={300} height={200} className="rounded-xl mb-4" /> */}
                <div className="flex flex-col gap-[16px]">
                  <section className="flex flex-col gap-[8px]">
                    <label className="text-xl font-bold">{job.shop.item.name}</label>
                    <div className="flex gap-[6px] h-[20px]">
                      <Image src="/clock-icon.png" alt="일시" width={20} height={20} />
                      <span className="text-gray-50 text-sm">
                        {new Date(job.startsAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                      <span className="text-gray-50 text-sm">({job.workhour}시간)</span>
                    </div>
                    <div className="flex gap-[6px] h-[20px]">
                      <Image src="/location-icon.png" alt="장소" width={20} height={20} />
                      <span className="text-gray-50 text-sm">{job.shop.item.address1}</span>
                    </div>
                  </section>
                  <section className="flex justify-between items-center gap-[9px]">
                    <span className="font-bold text-xl">{job.hourlyPay.toLocaleString()}원</span>
                    {isIncreased && (
                      <div className="flex justify-center items-center rounded-[20px] bg-red-40 pt-[8px] pb-[8px] pr-[12px] pl-[12px]">
                        <span className="text-white text-sm">기존 시급보다</span>
                        <span className="text-white ml-1 text-sm">{displayMessage}</span>
                        <Image src="/arrow-up-bold.png" alt="시급 인상" width={20} height={20} />
                      </div>
                    )}
                  </section>
                </div>
              </div>
            );
          })}
        </div>
        \
      </section>
    </>
  );
}
