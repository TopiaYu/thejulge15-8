'use client';

import NoticeInfo from '@/components/notice-detail/NoticeInfo';
import axios from '@/lib/api/axios';
import { use, useEffect, useState } from 'react';
import LatestNotice from '../../../../components/notice-detail/LatestNotice';
import { FadeLoader } from 'react-spinners';

interface Props {
  shopId: string;
  noticeId: string;
}

interface NoticeData {
  noticeId: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shopId: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  shopDescription: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface LatestData {
  shopId: string;
  noticeId: string;
  closed: boolean;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const NoticeDetail = ({ params }: { params: Promise<Props> }) => {
  const [notice, setNotice] = useState<NoticeData>({
    noticeId: '',
    hourlyPay: 0,
    startsAt: '',
    workhour: 0,
    description: '',
    closed: false,
    shopId: '',
    name: '',
    category: '',
    address1: '',
    address2: '',
    shopDescription: '',
    imageUrl: '',
    originalHourlyPay: 0,
  });
  const [checkPoint, setCheckPoint] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const { shopId, noticeId } = use(params);

  useEffect(() => {
    const getNotice = async () => {
      setIsLoading(false);
      try {
        const res = await axios.get(`/shops/${shopId}/notices/${noticeId}`);
        const data = res.data;
        setNotice({
          noticeId: data.item.id,
          hourlyPay: data.item.hourlyPay,
          startsAt: data.item.startsAt,
          workhour: data.item.workhour,
          description: data.item.description,
          closed: data.item.closed,
          shopId: data.item.shop.item.id,
          name: data.item.shop.item.name,
          category: data.item.shop.item.category,
          address1: data.item.shop.item.address1,
          address2: data.item.shop.item.address2,
          shopDescription: data.item.shop.item.description,
          imageUrl: data.item.shop.item.imageUrl,
          originalHourlyPay: data.item.shop.item.originalHourlyPay,
        });
        setIsLoading(true);
      } catch (error) {
        console.error('공고 조회 에러', error);
      } finally {
        setIsLoading(true);
      }
    };
    getNotice();
  }, [shopId, noticeId]);

  useEffect(() => {
    const latest = localStorage.getItem('latest');
    if (latest) {
      const arr = JSON.parse(latest);
      const newValue = {
        shopId: notice.shopId,
        noticeId: notice.noticeId,
        closed: notice.closed,
        hourlyPay: notice.hourlyPay,
        startsAt: notice.startsAt,
        workhour: notice.workhour,
        name: notice.name,
        address1: notice.address1,
        imageUrl: notice.imageUrl,
        originalHourlyPay: notice.originalHourlyPay,
      };
      const noticeFilter = arr.filter((item: LatestData) => newValue.noticeId !== item.noticeId);
      const updateArr = [newValue, ...noticeFilter];
      localStorage.setItem('latest', JSON.stringify(updateArr));
      setCheckPoint(notice?.noticeId);
    } else {
      if (!notice.noticeId) return;
      localStorage.setItem(
        'latest',
        JSON.stringify([
          {
            shopId: notice.shopId,
            noticeId: notice.noticeId,
            closed: notice.closed,
            hourlyPay: notice.hourlyPay,
            startsAt: notice.startsAt,
            workhour: notice.workhour,
            name: notice.name,
            address1: notice.address1,
            imageUrl: notice.imageUrl,
            originalHourlyPay: notice.originalHourlyPay,
          },
        ]),
      );
      setCheckPoint(notice?.noticeId);
    }
  }, [notice]);

  const startsAt = new Date(notice.startsAt);
  const now = new Date();

  const isPast = startsAt < now;

  return (
    <>
      {!isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <FadeLoader
            color="#EA3C12"
            height={30}
            loading
            margin={10}
            radius={10}
            speedMultiplier={1}
            width={6}
          />
        </div>
      ) : (
        <div className="bg-gray-5 flex flex-col items-center pt-10 sm:pt-[60px] px-3 lg:px-8 pb-20 sm:pb-[60px] lg:pb-[120px]">
          {notice.noticeId && <NoticeInfo info={notice} isPast={isPast} />}
          <section className="max-w-[964px] min-w-[350px] w-full ">
            <h3 className="text-lg sm:text-2xl font-bold text-[#111322] mb-4 sm:mb-8">
              최근에 본 공고
            </h3>
            <LatestNotice checkPoint={checkPoint} />
          </section>
        </div>
      )}
    </>
  );
};

export default NoticeDetail;
