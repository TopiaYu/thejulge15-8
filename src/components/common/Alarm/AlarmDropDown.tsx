import { RefObject } from 'react';
import { AlarmList } from '../../../types/types';
import AlarmCard from './AlarmCard';

interface AlarmDropDownProps {
  alarm: AlarmList | null;
  getAlarmId: (e: React.MouseEvent<HTMLDivElement>) => void;
  ref: RefObject<HTMLDivElement | null>;
}

const AlarmDropDown = ({ alarm, getAlarmId, ref }: AlarmDropDownProps) => {
  return (
    <div
      ref={ref}
      className="alarm absolute top-7 w-[368px] h-[419px] py-6 px-5 z-10 rounded-[10px] bg-red-10 border border-solid border-gray-30 overflow-y-scroll custom-scroll"
    >
      <h3 className="mb-4">알림 {alarm ? alarm.count : 0}개</h3>
      {alarm &&
        alarm.items.map((alItem) => {
          return (
            <AlarmCard
              key={alItem.id}
              id={alItem.id}
              result={alItem.result}
              shopName={alItem.shop?.item?.name}
              startsAt={alItem.notice?.item?.startsAt}
              workHour={alItem.notice?.item?.workhour}
              createAt={alItem.createdAt}
              read={alItem.read}
              onClick={getAlarmId}
            />
          );
        })}
      <div></div>
    </div>
  );
};

export default AlarmDropDown;
