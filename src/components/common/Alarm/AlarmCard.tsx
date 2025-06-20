import clsx from 'clsx';
import { useCallback } from 'react';

interface Props {
  id: string;
  result: string;
  shopName: string;
  startsAt: string;
  workHour: number;
  createAt: string;
  read: boolean;
  readCheck: boolean;
}

const AlarmCard = ({
  id,
  result,
  shopName,
  startsAt,
  workHour,
  createAt,
  read,
  readCheck,
}: Props) => {
  const date = new Date(startsAt);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, '0');
  const day = String(date?.getDate()).padStart(2, '0');
  const hour = String(date?.getHours()).padStart(2, '0');
  const minute = String(date?.getMinutes()).padStart(2, '0');

  // 신청 결과에 따른 카드 컨텐츠 색상 변환
  const cardClass = clsx(result === 'accepted' ? 'text-blue-20' : 'text-red-40');
  const dotClass = clsx(result === 'accepted' ? 'bg-blue-20' : 'bg-red-40');
  const activeRead = !readCheck ? read : true;
  // 지난 시간 계산
  const getTime = useCallback(() => {
    const createDate = new Date(createAt);
    const now = new Date();

    const diffMs = now.getTime() - createDate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);

    if (diffSeconds < 60) {
      return `${diffSeconds}초 전`;
    }

    const diffMinute = Math.floor(diffSeconds / 60);
    if (diffMinute < 60) {
      return `${diffMinute}분 전`;
    }

    const diffHour = Math.floor(diffMinute / 60);
    if (diffHour < 24) {
      return `${diffHour}시간 전`;
    }

    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  }, [createAt]);

  return (
    <div
      key={id}
      className="w-full border border-solid border-gray-20 bg-white rounded-[5px] px-3 py-4 font-normal text-sm leading-5 mb-2 cursor-pointer"
    >
      <div
        className={`rounded-[9999px] w-[5px] h-[5px] mb-1 ${!activeRead ? dotClass : 'bg-black'}`}
      ></div>
      <p className="mb-1">
        {shopName}({year}-{month}-{day} {hour}:{minute}~{Number(hour) + workHour}:{minute}) 공고
        지원이
        <span className={!activeRead ? cardClass : 'text-black'}>
          {result === 'accepted' ? ' 승인' : ' 거절'}
        </span>
        되었어요.
      </p>
      <div className="font-normal text-xs leading-4 text-gray-40">{getTime()}</div>
    </div>
  );
};

export default AlarmCard;
