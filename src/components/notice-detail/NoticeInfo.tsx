'use client';

import { useEffect } from 'react';
import PayRate from './PayRate';
import WorkHour from './StartsAt';
import NoticeImage from './NoticeImage';
import ApplyButton from './ApplyButton';

interface NoticeInfo {
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

const NoticeInfo = ({ info }: { info: NoticeInfo }) => {
  const className = 'relative w-[539px] h-[308px]';
  let category;

  const categoryFilter = (category: string | null) => {
    switch (category) {
      case '카페':
        category = '카페';
        break;
      case '편의점':
        category = '편의점';
        break;
      case '기타':
        category = '기타';
        break;
      default:
        category = '식당';
        break;
    }
  };

  useEffect(() => {
    categoryFilter(info.category);
  }, []);

  return (
    <div>
      <p>{info.category ? category : ''}</p>
      <h3>{info.name}</h3>
      <NoticeImage imageUrl={info.imageUrl} name={info.name} className={className} />
      <div>
        <p>시급</p>
        <div>
          {info?.hourlyPay.toLocaleString()}
          <span>
            <PayRate hourlyPay={info?.hourlyPay} originalPay={info?.originalHourlyPay} />
          </span>
        </div>
        <p>
          <WorkHour startsAt={info.startsAt} workhour={info.workhour} />
        </p>
        <p>{info.address1}</p>
        <div>{info.shopDescription}</div>
        <ApplyButton shopId={info.shopId} noticeId={info.noticeId} />
        <div>{info.description}</div>
      </div>
    </div>
  );
};

export default NoticeInfo;
