'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface JobPostDetailItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
    href: string;
  };
  currentUserApplication?: {
    item: {
      id: string;
      status: 'pending' | 'accepted' | 'rejected' | 'canceled';
      createdAt: string;
    };
  };
}

interface StoreDetailProps {
  item: JobPostDetailItem;
}

export default function StoreDetail({ item }: StoreDetailProps) {
  const { hourlyPay, startsAt, workhour, description, shop } = item;
  const { name, category, address1, address2, imageUrl, originalHourlyPay } = shop.item;
  const fullAddress = `${address1} ${address2}`;
  const wageIncreaseRate = ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
  const router = useRouter();

  const handleButton = () => {
    router.push('/owner/register-job');
  };

  // 시급 인상률 계산 로직
  // originalHourlyPay가 유효하고, 0이 아니며, 현재 시급과 다를 때만 계산 및 표시
  const showWageComparison =
    originalHourlyPay !== undefined && originalHourlyPay !== 0 && hourlyPay !== originalHourlyPay;
  const increaseRate = showWageComparison
    ? ((hourlyPay - originalHourlyPay!) / originalHourlyPay!) * 100 // ! 단언문은 undefined가 아님을 확신할 때 사용
    : 0; // 조건이 맞지 않으면 0%로 설정
  const wageComparisonText = `기존 시급보다 ${increaseRate.toFixed(0)}%`;

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
    return `${dateStr} ${startTimeStr} ~ ${endTimeStr} (${workhour}시간)`;
  }

  const displayTime = formatJobTime(startsAt, workhour);

  return (
    <div className="w-full max-w-[964px] px-8 max-[375px]:px-4 mx-auto">
      <header className="mt-15 mb-6">
        <h3 className="text-base max-[374px]:text-sm text-orange font-bold">{category}</h3>
        <h1 className="text-2xl max-[374px]:text-lg font-bold">{name}</h1>
      </header>
      <div
        className="w-full border border-gray-20 grid grid-cols-1 gap-8 p-6 rounded-2xl
                    md:grid-cols-[1fr_minmax(0,346px)]"
      >
        <div className="w-full min-h-[308px] border-0 rounded-xl bg-amber-700 relative overflow-hidden">
          <Image src={imageUrl} alt="가게 이미지" layout="fill" objectFit="cover" />
        </div>
        <div className="mt-4">
          <h3 className="text-base max-[374px]:text-sm text-orange font-bold">시급</h3>
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl max-[374px]:text-xl font-bold mt-2">{hourlyPay}</h2>

            {/* 있으면 보여주기 */}
            {showWageComparison && (
              <div className="flex bg-orange text-white border-0 rounded-4xl px-3 py-2">
                <p className="text-sm max-[374px]:text-xs">{wageComparisonText}</p>
                <span className="flex items-center">
                  <Image
                    src="/arrow-up-bold.png"
                    width={16}
                    height={16}
                    className="min-[375px]:w-5 min-[375px]:h-5"
                    alt="arrow-up"
                  />
                </span>
              </div>
            )}
          </div>
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
            <p className="text-gray-50 text-base max-[374px]:text-sm">{displayTime}</p>
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
            <p className="text-gray-50 text-base max-[374px]:text-sm">{fullAddress}</p>
          </div>
          <p className="mt-3 min-h-[78px] text-base max-[374px]:text-sm">{description}</p>
          <div className="flex justify-center mt-3 w-full">
            <button
              className="cursor-pointer border px-1 w-full py-3.5 text-orange text-base max-[374px]:text-sm font-bold border-orange rounded-md"
              onClick={handleButton}
            >
              공고 편집하기
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-10 rounded-xl p-8 mt-6 mb-15">
        <h3 className="font-bold mb-3">공고 설명</h3>
        <p className="text-base max-[374px]:text-sm">
          기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요. 급해서 시급도
          높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요.
        </p>
      </div>
    </div>
  );
}
