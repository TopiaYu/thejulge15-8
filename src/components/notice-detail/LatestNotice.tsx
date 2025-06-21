'use client';

import { useEffect, useState } from 'react';
import NoticeCard from './NoticeCard';

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

const LatestNotice = ({ checkPoint }: { checkPoint?: string | null }) => {
  const [latestArray, setLatestArray] = useState<LatestData[] | null>(null);

  useEffect(() => {
    const storage = localStorage.getItem('latest');
    setLatestArray(storage ? JSON.parse(storage).slice(0, 7) : null);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'latest') {
        setLatestArray(e.newValue ? JSON.parse(e.newValue).slice(0, 7) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkPoint]);

  return (
    <>
      {!latestArray ? (
        <div className="flex justify-center">
          <h3>최근에 본 공고가 없습니다.</h3>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-2  lg:gap-3.5">
          {latestArray.map((item: LatestData) => {
            if (item.noticeId === '') return;
            return <NoticeCard info={item} key={item.noticeId} />;
          })}
        </div>
      )}
    </>
  );
};
export default LatestNotice;
