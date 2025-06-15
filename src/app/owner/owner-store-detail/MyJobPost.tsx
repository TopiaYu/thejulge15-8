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
  shopName: string;
  shopAddress: string;
  shopImageUrl?: string;
  originalHourlyPay?: number;
}

export default function MyJobPost({
  notice,
  shopId,
  shopName,
  shopAddress,
  shopImageUrl,
  originalHourlyPay,
}: MyJobPostProps) {
  const router = useRouter();
  const startsAtDate = new Date(notice.startsAt);
  const endTime = new Date(startsAtDate.getTime() + notice.workhour);

  return (
    <div className="p-4 max-w-[312px] max-h-[349px] border border-gray-20 bg-white rounded-2xl">
      <div className="w-full max-w-[280px] max-h-[160px] border rounded-xl">
        <img className="w-full max-w-[280px] max-h-[160px]" src={shopImageUrl} />
      </div>
      <div>
        <h3 className="text-black mt-4 font-bold text-lg">{shopName}</h3>

        <div className="flex gap-1.5 mt-2">
          <span className="flex items-center">
            <Image
              src="/clock-icon.png"
              width={16}
              height={16}
              className="min-[375px]:w-5 min-[375px]:h-5"
              alt="time"
            />
          </span>
          <p className="text-gray-50 text-base max-[374px]:text-sm">{notice.startsAt}</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          <span className="flex items-center">
            <Image
              src="/location-icon.png"
              width={16}
              height={16}
              className="min-[375px]:w-5 min-[375px]:h-5"
              alt="location"
            />
          </span>
          <p className="text-gray-50 text-base max-[374px]:text-sm">{shopAddress}</p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <h2 className="text-xl font-bold">{notice.hourlyPay}원</h2>
          {/* 있으면 보여주기 */}
          <div className="rounded-4xl bg-orange px-3 py-2 flex gap-1">
            <p className="text-white text-sm">기존 시급보다 50%</p>
            <Image
              src="/arrow-up-bold.png"
              width={16}
              height={16}
              className="min-[375px]:w-5 min-[375px]:h-5"
              alt="location"
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
