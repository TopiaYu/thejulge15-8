'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NoticeListItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface MyJobPostProps {
  notice: NoticeListItem;
  shopId: string;
}

export default function MyJobPost({ notice, shopId }: MyJobPostProps) {
  const router = useRouter;
  const startsAtDate = new Date(notice.startsAt);
  const endTime = new Date(startsAtDate.getTime() + notice.workhour);

  return;
  <div className="p-4 max-w-[312px] max-h-[349px]">
    <div className="w-full">
      <img />
    </div>
    <div>
      <h3 className="text-black">가게명</h3>

      <div className="flex gap-1.5 mt-3">
        <span className="flex items-center">
          <Image
            src="/clock-icon.png"
            width={16}
            height={16}
            className="min-[375px]:w-5 min-[375px]:h-5"
            alt="time"
          />
        </span>
        <p className="text-gray-50 text-base max-[374px]:text-sm">날짜 및 시간</p>
      </div>
      <div className="flex gap-1.5 mt-3">
        <span className="flex items-center">
          <Image
            src="/location-icon.png"
            width={16}
            height={16}
            className="min-[375px]:w-5 min-[375px]:h-5"
            alt="location"
          />
        </span>
        <p className="text-gray-50 text-base max-[374px]:text-sm">위치</p>
      </div>

      <div className="flex">
        <h2>시급</h2>
        {/* 있으면 보여주기 */}
        <div>
          <p>기존시급보다 ~ 50%</p>
          <img />
        </div>
      </div>
    </div>
  </div>;
}
