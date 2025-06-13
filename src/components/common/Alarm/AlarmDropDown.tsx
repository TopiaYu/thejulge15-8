import { AlarmList } from '../../../types/types';
import AlarmCard from './AlarmCard';

interface AlarmDropDownProps {
  alarm: AlarmList | null;
}

const AlarmDropDown = ({ alarm }: AlarmDropDownProps) => {
  return (
    <div className="absolute top-6 w-[368px] h-[419px] py-6 px-5 z-10 rounded-[10px] bg-red-10 border border-solid border-gray-30">
      <h3 className="mb-4">알림 {alarm ? alarm.count : 0}개</h3>
      {alarm &&
        alarm.items.map((alItem) => {
          return (
            <AlarmCard
              key={alItem.item.id}
              id={alItem.item.id}
              result={alItem.item.result}
              shopName={alItem.shop.item.name}
              startsAt={alItem.notice.item.startsAt}
              workHour={alItem.notice.item.workhour}
              createAt={alItem.item.createdAt}
              read={alItem.item.read}
            />
          );
        })}
      <div></div>
    </div>
  );
};

export default AlarmDropDown;
