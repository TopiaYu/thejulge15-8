'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Filter from '@/components/notice/filter';
import DetailFilter from '@/components/notice/detailfilter';
import axios from '@/lib/api/axios';
import Link from 'next/link';
import { useSortOption, useDetailOption } from '@/lib/hooks/zustand';

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
  const { sortOption } = useSortOption();
  const { detailOption } = useDetailOption();
  useEffect(() => {
    bringData(sortOption, detailOption);
  }, [sortOption, detailOption]);
  async function bringData(sort: string, option: typeof detailOption) {
    const sortMap: Record<string, string> = {
      '마감 임박 순': 'time',
      '시급 많은 순': 'pay',
      '시간 적은 순': 'hour',
      '가나다 순': 'shop',
    };

    const params = new URLSearchParams();
    params.append('limit', '100');
    params.append('offset', '0');
    params.append('sort', sortMap[sort] || 'time');
    params.append('hourlyPayGte', String(option.pay));

    // ✅ address 여러 개 추가
    if (Array.isArray(option.location)) {
      option.location.slice(0, 3).forEach((loc) => {
        params.append('address', loc); // 같은 키로 append!
      });
    } else if (option.location) {
      params.append('address', option.location);
    }

    try {
      const response = await axios.get(`/notices?${params.toString()}`);
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
      console.log({ params });
      console.log('요청 URL:', `/notices?${params.toString()}`);
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  }
  return (
    <>
      <section className="bg-red-10 flex flex-col justify-center items-center py-[40px]">
        <div className="w-full flex flex-col max-w-[964px] px-4">
          <h1 className="text-black text-xl md:text-2xl font-bold mb-[31px] w-full flex justify-start">
            맞춤 공고
          </h1>

          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-[14px] justify-center md:justify-start min-w-max px-2">
              <div className="w-[171px] h-[261px] md:w-[312px] md:h-[349px] p-[14px] bg-white border border-gray-200 rounded-xl shrink-0">
                1
              </div>
              <div className="w-[171px] h-[261px] md:w-[312px] md:h-[349px] p-[14px] bg-white border border-gray-200 rounded-xl shrink-0">
                2
              </div>
              <div className="w-[171px] h-[261px] md:w-[312px] md:h-[349px] p-[14px] bg-white border border-gray-200 rounded-xl shrink-0">
                3
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <div className="w-[350px] mb-[16px] flex flex-col gap-[16px] items-start md:flex-row md:justify-between md:items-center md:pb-[32px] md:w-[638px] pt-[60px] xl:w-[964px]">
          <div className="text-black text-xl md:text-2xl font-bold ">전체 공고</div>
          <div className="flex gap-[10px]">
            <Filter />
            <DetailFilter />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-[8px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[31px] xl:grid-cols-3">
          {jobList.map((job) => {
            const originalPay = job.shop.item.originalHourlyPay;
            const currentPay = job.hourlyPay;

            let percentageIncrease = 0;
            let displayMessage = '';
            let shouldDisplayIncreaseInfo = false;

            if (originalPay > 0 && currentPay > originalPay) {
              percentageIncrease = ((currentPay - originalPay) / originalPay) * 100;
              displayMessage = `${Math.round(percentageIncrease)}%`;
              shouldDisplayIncreaseInfo = true;
            } else if (currentPay > 0 && originalPay === 0) {
              displayMessage = '새로운 시급';
              shouldDisplayIncreaseInfo = true;
            }

            return (
              <div
                key={job.id}
                className="w-[171px] h-[261px] p-[8px] bg-white border border-gray-20 rounded-xl md:w-[312px] md:h-[349px] md:p-[14px]"
              >
                <Link href={`/notice/${job.shop.item.id}/${job.id}`}>
                  {/*<div className="rounded-xl h-[84px] mb-[12px] md:mb-[20px] md:h-[171px]">
                    <Image
                      src={job.shop.item.imageUrl?.split('?')[0] || '/default-thumbnail.png'}
                      alt="대표 이미지"
                      width={300}
                      height={200}
                    />
                  </div>*/}

                  <div className="flex flex-col gap-[16px]">
                    <section className="flex flex-col gap-[8px]">
                      <label className="text-base font-bold md:text-xl ">
                        {job.shop.item.name}
                      </label>
                      <div className="flex gap-[6px] h-[20px]">
                        <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
                          <Image src="/clock-icon.png" alt="일시" fill className="object-contain" />
                        </div>
                        <span className="text-xs text-gray-50 md:text-sm">
                          {new Date(job.startsAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </span>
                        <span className="text-xs text-gray-50 md:text-sm">
                          ({job.workhour}시간)
                        </span>
                      </div>
                      <div className="flex gap-[6px] h-[20px]">
                        <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
                          <Image
                            src="/location-icon.png"
                            alt="장소"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-gray-50 text-sm">{job.shop.item.address1}</span>
                      </div>
                    </section>
                    <section className="flex flex-col justify-between items-start md:flex-row md:items-center">
                      <span className="font-bold text-lg md:text-2xl">
                        {job.hourlyPay.toLocaleString()}원
                      </span>
                      {shouldDisplayIncreaseInfo && (
                        <div className="flex justify-center items-center rounded-[20px] md:bg-red-40 pt-[8px] md:pb-[8px] md:pr-[12px] md:pl-[12px]">
                          <span className="text-red-40 text-xs md:text-white md:text-sm ">
                            기존 시급보다{' '}
                          </span>
                          <span className="text-red-40 text-xs md:text-white md:text-sm">
                            {' '}
                            {displayMessage}
                          </span>
                          <div className="">
                            <Image
                              src="/arrow-up-bold.png"
                              alt="시급 인상"
                              width={20}
                              height={20}
                              className="hidden md:block"
                            />
                            <Image
                              src="/arrow-orange.png"
                              alt="시급 인상"
                              width={11}
                              height={11}
                              className="block md:hidden"
                            />
                          </div>
                        </div>
                      )}
                    </section>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        \
      </section>
    </>
  );
}
