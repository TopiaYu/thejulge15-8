import Link from 'next/link';
import Alarm from '../Alarm/Alarm';
import useAuth from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import axios from '@/lib/api/axios';
import { AlarmList } from '@/types/types';
import AlarmDropDown from '../Alarm/AlarmDropDown';
import useToken from '@/lib/hooks/use-token';
import { CancelData } from '../../../types/types';

interface UserValue {
  id: string | null;
  type: 'employer' | 'employee';
}

const UserMenu = () => {
  const [userValue, setUserValue] = useState<UserValue | null>(null);
  const [alarmList, setAlarmList] = useState<AlarmList | null>(null);
  const [newAlarm, setNewAlarm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [alarmid, setAlarmId] = useState('');
  const [storageData, setStorageData] = useState<CancelData>();
  const { userData, logout } = useAuth();
  const router = useRouter();
  const token = useToken();
  const albaActiveLink = userData?.item.user.item.name ? '/member/myprofile' : '/member/profile';
  const ownerActiveLink = userData?.item.user.item.name ? '/owner/owner-store-detail' : '/owner';

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

  // 지원 목록 가져오기
  useEffect(() => {
    const storage = localStorage.getItem('cancel-data');
    setStorageData(storage ? JSON.parse(storage) : null);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cancel-data') {
        setStorageData(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // 알림 목록 조회
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

        // 불필요한 api 호출 막기
        const userId = userData?.item.user.item.id;

        if (userId && storageData?.[userId].apply.length === data?.count) {
          clearInterval(alarmInterval);
        }
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
  }, [userValue, token, storageData]);

  // 새로운 알림 있으면 newAlarm true로 변경
  useEffect(() => {
    const alarmCheckPoint = alarmList?.items.some(({ read }) => read === false);
    if (alarmCheckPoint) {
      setNewAlarm(true);
    }
  }, [alarmList]);

  // 알림 읽음 처리
  useEffect(() => {
    if (!alarmid) return;
    const alarmRead = async () => {
      const userId = userData?.item.user.item.id;
      const res = await axios.put(`/users/${userId}/alerts/${alarmid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
    };

    alarmRead();
  }, [userData, alarmid, token]);

  const getAlarmId = (e: React.MouseEvent<HTMLDivElement>) => {
    setAlarmId(e.currentTarget.id);
  };

  const alarmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (alarmRef.current && !alarmRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {userValue?.type === 'employer' ? (
        <>
          <Link href={ownerActiveLink}>내 가게</Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="cursor-pointer"
          >
            로그아웃
          </button>
          <Alarm newAlarm={newAlarm} onClick={() => setIsOpen(!isOpen)} />
          {isOpen && <AlarmDropDown alarm={alarmList} getAlarmId={getAlarmId} ref={alarmRef} />}
        </>
      ) : (
        <>
          <Link href={albaActiveLink}>내 프로필</Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="cursor-pointer"
          >
            로그아웃
          </button>
          <div className="relative flex flex-col items-end">
            <Alarm newAlarm={newAlarm} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && <AlarmDropDown alarm={alarmList} getAlarmId={getAlarmId} ref={alarmRef} />}
          </div>
        </>
      )}
    </>
  );
};

export default UserMenu;
