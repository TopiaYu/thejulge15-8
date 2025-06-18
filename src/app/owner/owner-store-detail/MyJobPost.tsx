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

const default_shop_image_url = '/logo.png';

export default function MyJobPost({
  notice,
  shopId,
  shopName,
  shopAddress,
  shopImageUrl,
  originalHourlyPay,
}: MyJobPostProps) {
  const router = useRouter();
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

  //시간 조절 함수
  function formatJobTime(startsAt: string, workhour: number): string {
    const startDate = new Date(startsAt);
    const localStartDate = new Date(startDate.getTime() + 9 * 60 * 60 * 1000);
    const endDate = new Date(localStartDate);
    endDate.setHours(endDate.getHours() + workhour);
    const pad = (num: number) => num.toString().padStart(2, '0');
    const dateStr = `${localStartDate.getFullYear()}-${pad(localStartDate.getMonth() + 1)}-${pad(localStartDate.getDate())}`;
    const startTimeStr = `${pad(localStartDate.getHours())}:${pad(localStartDate.getMinutes())}`;
    const endTimeStr = `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;
    return `${dateStr} ${startTimeStr}~${endTimeStr}(${workhour}시간)`;
  }
  const displayTime = formatJobTime(notice.startsAt, notice.workhour);

  return (
    <div
      className="p-4 max-w-[312px] max-h-[349px] border border-gray-20 bg-white rounded-2xl cursor-pointer"
      onClick={handleViewDetail}
    >
      <div className="w-full max-w-[280px] h-40 max-h-[160px] border rounded-xl relative overflow-hidden">
        <Image
          src={shopImageUrl || default_shop_image_url}
          alt={'가게 이미지'}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-black mt-4 font-bold text-lg">{shopName}</h3>

        <div className="flex gap-1 mt-2">
          <span className="flex items-center">
            <Image
              src="/clock-icon.png"
              width={16}
              height={16}
              className="min-[375px]:w-5 min-[375px]:h-5"
              alt="time"
            />
          </span>
          <p className="text-gray-50 text-base max-[374px]:text-sm">{displayTime}</p>
        </div>
        <div className="flex gap-1 mt-2">
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
          <h2 className="text-xl font-bold">{notice.hourlyPay.toLocaleString('ko-KR')}원</h2>
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
