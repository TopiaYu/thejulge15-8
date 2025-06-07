import Link from 'next/link';
import Alarm from './Alarm';
import useAuth from '@/lib/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/api/axios';
import { Notice, Shop } from '@/types/types';
import AlarmDropDown from './AlarmDropDown';

interface UserValue {
  id: string | null;
  type: 'employer' | 'employee';
}

interface AlarmItem {
  id: string;
  createdAt: string;
  result: 'accepted' | 'rejected';
  read: boolean;
  application: {
    item: {
      id: string;
      status: 'pending' | 'accepted' | 'rejected';
    };
    href: string;
  };
}

interface AlarmListItem {
  item: AlarmItem;
  shop: Shop;
  notice: Notice;
}

interface AlarmList {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: AlarmListItem[];
}

const UserMenu = () => {
  const [userValue, setUserValue] = useState<UserValue | null>(null);
  const [alarmList, setAlarmList] = useState<AlarmList | null>(null);
  const [newAlarm, setNewAlarm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userData, logout } = useAuth();
  const router = useRouter();

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
        const res = await axios.get(`/users/${userValue?.id}/alerts`);
        setAlarmList(res.data);
      } catch (error) {
        console.error('Alarm Api 호출 에러:', error);
      }
    };
    if (userValue) {
      getAlarmList();
    }
  }, [userValue]);

  // 새로운 알림 있으면 newAlarm true로 변경
  useEffect(() => {
    const alarmCheckPoint = alarmList?.items.some(({ item }) => item.read === false);
    if (alarmCheckPoint) {
      setNewAlarm(true);
    }
  }, [alarmList]);

  return (
    <>
      {userValue?.type === 'employer' ? (
        <>
          <Link href="#">내 가게</Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            로그아웃
          </button>
          <Alarm newAlarm={newAlarm} onClick={() => setIsOpen(!isOpen)} />
          {isOpen && <AlarmDropDown />}
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
          <Alarm newAlarm={newAlarm} onClick={() => setIsOpen(!isOpen)} />
          {isOpen && <AlarmDropDown />}
        </>
      )}
    </>
  );
};

export default UserMenu;
