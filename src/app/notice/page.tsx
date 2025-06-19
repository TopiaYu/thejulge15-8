'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Filter from '@/components/notice/filter';
import DetailFilter from '@/components/notice/detailfilter';
import axios from '@/lib/api/axios';
import Link from 'next/link';
import { useSortOption, useDetailOption } from '@/lib/hooks/zustand';
import Pagenation from '@/components/member/myprofile/Pagination';
import useAuth from '@/lib/hooks/use-auth';

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
  const sortOption = useSortOption((state) => state.sortOption);
  const { detailOption } = useDetailOption();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsCounts = 6;
  const totalPages = Math.ceil(totalItems / itemsCounts);

  const [recommendList, setRecommendList] = useState<JobList[]>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { userData } = useAuth();
  useEffect(() => {
    async function fetchRecommendList(userID?: string) {
      try {
        let response;

        console.log(userID);
        if (userID) {
          const addressResponse = await axios.get(`/users/${userID}`);
          const userAddress = addressResponse.data.item.address;
          response = await axios.get('/notices', {
            params: {
              limit: 3,
              sort: 'time',
              address: userAddress,
            },
          });
        } else {
          response = await axios.get('/notices', {
            params: {
              limit: 3,
              sort: 'time',
            },
          });
        }

        const settingData: JobList[] = response.data.items.map((dataItem: dataItem) => ({
          id: dataItem.item.id,
          hourlyPay: dataItem.item.hourlyPay,
          startsAt: dataItem.item.startsAt,
          workhour: dataItem.item.workhour,
          description: dataItem.item.description,
          closed: dataItem.item.closed,
          shop: dataItem.item.shop,
        }));

        setRecommendList(settingData);
      } catch (error) {
        console.error('추천 공고 불러오기 실패:', error);
      }
    }
    const userId = userData?.item.user.item.id;
    fetchRecommendList(userId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const sortMap: Record<string, string> = {
        '마감 임박 순': 'time',
        '시급 많은 순': 'pay',
        '시간 적은 순': 'hour',
        '가나다 순': 'shop',
      };

      const params = new URLSearchParams();
      params.append('sort', sortMap[sortOption] || 'time');
      params.append('hourlyPayGte', String(detailOption.pay));
      params.append('limit', String(itemsCounts));
      params.append('offset', String((currentPage - 1) * itemsCounts));

      if (Array.isArray(detailOption.location)) {
        detailOption.location.slice(0, 3).forEach((loc) => {
          params.append('address', loc);
        });
      } else if (detailOption.location) {
        params.append('address', detailOption.location);
      }

      try {
        const response = await axios.get('/notices', { params });

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
        setTotalItems(response.data.count);

        console.log('요청 URL:', `/notices?${params.toString()}`);
        console.log('세팅 데이터:', settingData);
      } catch (error) {
        console.error('공고 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [sortOption, detailOption, currentPage]);
  return (
    <>
      <section className="bg-red-10 flex flex-col justify-center items-center py-[40px]">
        <div className="w-full flex flex-col max-w-[964px] px-4">
          <h1 className="text-black text-xl sm:text-2xl font-bold mb-[31px] w-full flex justify-start px-4">
            맞춤 공고
          </h1>

          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="max-w-[964px] w-full mx-auto px-4">
              <div className="flex gap-4 justify-center sm:justify-start min-w-max">
                {recommendList.map((job) => {
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
                      className="w-[171px] h-[261px] sm:w-[312px] sm:h-[349px] p-[14px] bg-white border border-gray-200 rounded-xl shrink-0"
                    >
                      <Link href={`/notice/${job.shop.item.id}/${job.id}`}>
                        <div className="flex flex-col gap-[16px]">
                          <section className="flex flex-col gap-[8px]">
                            <Image
                              src={job.shop.item.imageUrl}
                              alt="가게 이미지"
                              width={312}
                              height={174}
                              className="rounded-xl object-cover w-full h-[174px]"
                            />
                            <label className="text-base font-bold sm:text-xl">
                              {job.shop.item.name}
                            </label>
                            <div className="flex gap-[6px] h-[20px]">
                              <div className="relative w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]">
                                <Image
                                  src="/clock-icon.png"
                                  alt="일시"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs text-gray-50 sm:text-sm">
                                {new Date(job.startsAt).toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                })}
                              </span>
                              <span className="text-xs text-gray-50 sm:text-sm">
                                ({job.workhour}시간)
                              </span>
                            </div>
                            <div className="flex gap-[6px] h-[20px]">
                              <div className="relative w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]">
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
                          <section className="flex flex-col justify-between items-start sm:flex-row sm:items-center">
                            <span className="font-bold text-lg sm:text-2xl">
                              {job.hourlyPay.toLocaleString()}원
                            </span>
                            {shouldDisplayIncreaseInfo && (
                              <div className="flex justify-center items-center rounded-[20px] sm:bg-red-40 pt-[8px] sm:pb-[8px] sm:pr-[12px] sm:pl-[12px]">
                                <span className="text-red-40 text-xs sm:text-white sm:text-sm">
                                  기존 시급보다{' '}
                                </span>
                                <span className="text-red-40 text-xs sm:text-white sm:text-sm">
                                  {displayMessage}
                                </span>
                                <div>
                                  <Image
                                    src="/arrow-up-bold.png"
                                    alt="시급 인상"
                                    width={20}
                                    height={20}
                                    className="hidden sm:block"
                                  />
                                  <Image
                                    src="/arrow-orange.png"
                                    alt="시급 인상"
                                    width={11}
                                    height={11}
                                    className="block sm:hidden"
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
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <div className="w-[350px] mb-[16px] flex flex-col gap-[16px] items-start sm:flex-row sm:justify-between sm:items-center sm:pb-[32px] sm:w-[638px] pt-[60px] xl:w-[964px]">
          <div className="text-black text-xl sm:text-2xl font-bold">전체 공고</div>
          <div className="flex gap-[10px]">
            <Filter />
            <DetailFilter />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[8px] gap-y-[16px] sm:gap-x-[14px] sm:gap-y-[31px] xl:grid-cols-3">
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
                className="w-[171px] h-[261px] p-[8px] bg-white border border-gray-20 rounded-xl sm:w-[312px] sm:h-[349px] sm:p-[14px]"
              >
                <Link href={`/notice/${job.shop.item.id}/${job.id}`}>
                  <div className="flex flex-col gap-[16px]">
                    <section className="flex flex-col gap-[8px]">
                      <Image
                        src={job.shop.item.imageUrl}
                        alt="가게 이미지"
                        width={312}
                        height={174}
                        className="rounded-xl object-cover w-full h-[174px]"
                      />
                      <label className="text-base font-bold sm:text-xl">{job.shop.item.name}</label>
                      <div className="flex gap-[6px] h-[20px]">
                        <div className="relative w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]">
                          <Image src="/clock-icon.png" alt="일시" fill className="object-contain" />
                        </div>
                        <span className="text-xs text-gray-50 sm:text-sm">
                          {new Date(job.startsAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </span>
                        <span className="text-xs text-gray-50 sm:text-sm">
                          ({job.workhour}시간)
                        </span>
                      </div>
                      <div className="flex gap-[6px] h-[20px]">
                        <div className="relative w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]">
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
                    <section className="flex flex-col justify-between items-start sm:flex-row sm:items-center">
                      <span className="font-bold text-lg sm:text-2xl">
                        {job.hourlyPay.toLocaleString()}원
                      </span>
                      {shouldDisplayIncreaseInfo && (
                        <div className="flex justify-center items-center rounded-[20px] sm:bg-red-40 pt-[8px] sm:pb-[8px] sm:pr-[12px] sm:pl-[12px]">
                          <span className="text-red-40 text-xs sm:text-white sm:text-sm">
                            기존 시급보다{' '}
                          </span>
                          <span className="text-red-40 text-xs sm:text-white sm:text-sm">
                            {displayMessage}
                          </span>
                          <div className="">
                            <Image
                              src="/arrow-up-bold.png"
                              alt="시급 인상"
                              width={20}
                              height={20}
                              className="hidden sm:block"
                            />
                            <Image
                              src="/arrow-orange.png"
                              alt="시급 인상"
                              width={11}
                              height={11}
                              className="block sm:hidden"
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
      </section>

      <Pagenation
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
