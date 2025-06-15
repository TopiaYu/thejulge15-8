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

  // 시급 인상률 계산 로직
  // originalHourlyPay가 유효하고, 0이 아니며, 현재 시급과 다를 때만 계산 및 표시
  const showWageComparison =
    originalHourlyPay !== undefined &&
    originalHourlyPay !== 0 &&
    notice.hourlyPay !== originalHourlyPay;

  const increaseRate = showWageComparison
    ? ((notice.hourlyPay - originalHourlyPay!) / originalHourlyPay!) * 100 // ! 단언문은 undefined가 아님을 확신할 때 사용
    : 0; // 조건이 맞지 않으면 0%로 설정

  const wageComparisonText = `기존 시급보다 ${increaseRate.toFixed(0)}%`;

  const handleViewDetail = () => {
    router.push(`/owner/job-detail/${shopId}/${notice.id}`);
  };

  return (
    <div
      className="p-4 max-w-[312px] max-h-[349px] border border-gray-20 bg-white rounded-2xl cursor-pointer"
      onClick={handleViewDetail}
    >
      <div className="w-full max-w-[280px] h-40 max-h-[160px] border rounded-xl relative overflow-hidden">
        <Image
          src={shopImageUrl || ''}
          alt={'가게 이미지'}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-black mt-4 font-bold text-lg">{shopName}</h3>

        <div className="flex gap-1.5 mt-2">
          <span className="flex items-center">
            {shopImageUrl ? (
              <Image
                src="/clock-icon.png"
                width={16}
                height={16}
                className="min-[375px]:w-5 min-[375px]:h-5"
                alt="time"
              />
            ) : (
              <div>이미지 없음</div>
            )}
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
          {showWageComparison && (
            <div className="rounded-4xl bg-orange px-3 py-2 flex gap-1">
              <p className="text-white text-sm">{wageComparisonText}</p>
              <Image
                src="/arrow-up-bold.png"
                width={16}
                height={16}
                className="min-[375px]:w-5 min-[375px]:h-5"
                alt="arrow-up"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
