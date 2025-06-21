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

const default_shop_image_url = '/clock-closed-icon.png';

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

  const isExpired = notice.closed;
  const startsAtDate = new Date(notice.startsAt);
  const now = new Date();
  const isPassed = startsAtDate.getTime() < now.getTime();

  const handleViewDetail = () => {
    if (isExpired || isPassed) {
      alert('마감이나 지난 공고입니다.');
      //아예 못가게 하기 로 해도 됨
      router.push(`/owner/job-detail/${shopId}/${notice.id}`);
    } else {
      router.push(`/owner/job-detail/${shopId}/${notice.id}`);
    }
  };

  //시간 조절 함수
  function formatJobTime(startsAt: string, workhour: number): string {
    const startDate = new Date(startsAt);
    // 로컬 타임존으로 자동 변환 (브라우저가 시간대 인식)
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + workhour);
    const pad = (num: number) => num.toString().padStart(2, '0');
    const dateStr = `${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}-${pad(startDate.getDate())}`;
    const startTimeStr = `${pad(startDate.getHours())}:${pad(startDate.getMinutes())}`;
    const endTimeStr = `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;
    return `${dateStr} ${startTimeStr}~${endTimeStr} (${workhour}시간)`;
  }
  const displayTime = formatJobTime(notice.startsAt, notice.workhour);

  return (
    <div
      className={`p-4 max-w-[312px] max-h-[349px] border border-gray-20 bg-white rounded-2xl cursor-pointer `}
      onClick={handleViewDetail}
    >
      <div
        className={`w-full max-w-[280px] h-40 max-h-[160px] border border-gray-30 rounded-xl relative overflow-hidden
                  ${isExpired ? '' : 'cursor-pointer hover:shadow-md'}
      `}
      >
        <Image
          src={shopImageUrl || default_shop_image_url}
          alt={'가게 이미지'}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {(isExpired || isPassed) && (
          <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-black opacity-70 z-10">
            <span className="text-gray-20 font-bold text-3xl z-20">
              {isExpired ? '마감 완료' : '지난 공고'}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3
          className={`${isExpired || isPassed ? 'text-gray-20' : 'text-black'} mt-4 font-bold text-lg`}
        >
          {shopName}
        </h3>

        <div className="flex gap-1 mt-2">
          <span className="flex items-center">
            <Image
              src={isExpired || isPassed ? '/clock-closed-icon.png' : `/clock-icon.png`}
              width={16}
              height={16}
              className="min-[375px]:w-5 min-[375px]:h-5"
              alt="time"
            />
          </span>
          <p
            className={`${isExpired || isPassed ? 'text-gray-20' : 'text-gray-50'} text-base max-[374px]:text-sm`}
          >
            {displayTime}
          </p>
        </div>
        <div className="flex gap-1 mt-2">
          <span className="flex items-center">
            <Image
              src={isExpired || isPassed ? '/location-closed-icon.png' : `/location-icon.png`}
              width={16}
              height={16}
              className="min-[375px]:w-5 min-[375px]:h-5"
              alt="location"
            />
          </span>
          <p
            className={`${isExpired || isPassed ? 'text-gray-20' : 'text-gray-50'} text-base max-[374px]:text-sm`}
          >
            {shopAddress}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <h2
            className={`${isExpired || isPassed ? 'text-gray-20' : 'text-base'} text-xl font-bold`}
          >
            {notice.hourlyPay.toLocaleString('ko-KR')}원
          </h2>
          {/* 있으면 보여주기 */}
          {showWageComparison && (
            <div
              className={`rounded-4xl px-3 py-2 flex gap-1 ${isExpired || isPassed ? 'bg-gray-10' : ' bg-orange'}`}
            >
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
