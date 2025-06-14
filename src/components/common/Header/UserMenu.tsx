import Link from 'next/link';
import Alarm from '../Alarm/Alarm';
import useAuth from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/api/axios';
import { AlarmList } from '@/types/types';
import AlarmDropDown from '../Alarm/AlarmDropDown';
import useToken from '@/lib/hooks/use-token';

interface UserValue {
  id: string | null;
  type: 'employer' | 'employee';
}

const UserMenu = () => {
  const [userValue, setUserValue] = useState<UserValue | null>(null);
  const [alarmList, setAlarmList] = useState<AlarmList | null>(null);
  const [newAlarm, setNewAlarm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userData, logout } = useAuth();
  const router = useRouter();
  const token = useToken();

  // 유저 데이터
  useEffect(() => {
    if (!userData) return;
    const {
      item: {
        user: {
          item: { id, type },
        },
      },
    } = userData;
    setUserValue({
      id,
      type,
    });
  }, [userData]);

  // 알리 목록 조회
  useEffect(() => {
    const getAlarmList = async () => {
      try {
        const res = await axios.get(`/users/${userValue?.id}/alerts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setAlarmList(data);
      } catch (error) {
        console.error('Alarm Api 호출 에러:', error);
      }
    };
    const alarmInterval = setInterval(() => {
      if (userValue) {
        getAlarmList();
      }
    }, 3000);
    return () => {
      clearInterval(alarmInterval);
    };
  }, [userValue]);
  // console.log(alarmList);

  // 새로운 알림 있으면 newAlarm true로 변경
  useEffect(() => {
    const alarmCheckPoint = alarmList?.items.some(({ read }) => read === false);
    if (alarmCheckPoint) {
      setNewAlarm(true);
    }
  }, [alarmList]);

  return (
    <>
      {userValue?.type === 'employer' ? (
        <>
          <Link href="/owner">내 가게</Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            로그아웃
          </button>
          <Alarm newAlarm={newAlarm} onClick={() => setIsOpen(!isOpen)} />
          {isOpen && <AlarmDropDown alarm={alarmList} />}
        </>
      ) : (
        <>
          <Link href="#">내 프로필</Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            로그아웃
          </button>
          <div className="relative flex flex-col items-end">
            <Alarm newAlarm={newAlarm} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && <AlarmDropDown alarm={alarmList} />}
          </div>
        </>
      )}
    </>
  );
};

export default UserMenu;
