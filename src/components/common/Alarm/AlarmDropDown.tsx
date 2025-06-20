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
        alarm.items.map((alItem, index) => {
          return (
            <AlarmCard
              key={alItem.item.id + index}
              id={alItem.item.id}
              result={alItem.item.result}
              shopName={alItem.item.shop?.item?.name}
              startsAt={alItem.item.notice?.item?.startsAt}
              workHour={alItem.item.notice?.item?.workhour}
              createAt={alItem.item.createdAt}
              read={alItem.item.read}
              onClick={getAlarmId}
            />
          );
        })}
      <div className="w-full h-2.5 bg-red-40"></div>
    </div>
  );
};

export default AlarmDropDown;
