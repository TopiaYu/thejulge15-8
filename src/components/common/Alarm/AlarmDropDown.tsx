import { RefObject, useEffect, useRef, useState } from 'react';
import { AlarmList } from '../../../types/types';
import AlarmCard from './AlarmCard';
import useAuth from '@/lib/hooks/use-auth';
import axios from '@/lib/api/axios';
import useToken from '@/lib/hooks/use-token';

interface AlarmDropDownProps {
  alarm: AlarmList | null;
  ref: RefObject<HTMLDivElement | null>;
  setNewAlarm: (value: boolean) => void;
}

const AlarmDropDown = ({ alarm, ref, setNewAlarm }: AlarmDropDownProps) => {
  const [readCheck, setReadCheck] = useState(false);
  const { userData } = useAuth();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const token = useToken();

  useEffect(() => {
    const userId = userData && userData.item.user.item.id;
    if (!alarm || !targetRef.current || !token) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          try {
            const alarmRead = async () => {
              Promise.all(
                alarm.items.map((item) =>
                  axios.put(
                    `/users/${userId}/alerts/${item.item.id}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  ),
                ),
              );
            };
            alarmRead();
            setNewAlarm(false);
            setReadCheck(true);
          } catch (error) {
            console.log('읽음 처리 에러:', error);
          }
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [alarm, token]);

  return (
    <div
      ref={ref}
      className="alarm absolute top-7 w-[368px] h-[419px] py-6 px-5 z-100 rounded-[10px] bg-red-10 border border-solid border-gray-30 overflow-y-scroll custom-scroll"
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
              readCheck={readCheck}
            />
          );
        })}
      <div ref={targetRef} className="absolute w-full h-full top-0 left-0"></div>
    </div>
  );
};

export default AlarmDropDown;
