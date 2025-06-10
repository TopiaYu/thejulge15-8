'use client';

import useAuth from '@/lib/hooks/use-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ModalProps {
  status: string;
  handler: () => void;
  modalClose: () => void;
}

const NoticeModalItem = ({ status, handler, modalClose }: ModalProps) => {
  const { userData } = useAuth();
  const router = useRouter();
  const boxClassName =
    'max-w-[298px] w-full relative -top-35 flex flex-col justify-center items-center bg-white p-6 rounded-xl text-base leading-[26px]';
  const whiteButton =
    'border border-solid border-orange text-sm text-orange rounded-md py-2.5 px-5';
  const orangeButton = 'bg-orange text-sm text-white rounded-md py-2.5 px-5';

  const loginAlertHandler = () => {
    router.push('/login');
  };

  const ProfileAlertHandler = () => {
    router.push('/member/profile');
  };

  useEffect(() => {
    // 모달이 열릴 때 스크롤을 고정하는 코드
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  if (!userData) {
    return (
      <div className={boxClassName}>
        <Image className="mb-4" src={'/alert.png'} width={24} height={24} alt="경고" />
        <p className="mb-8">로그인을 해주세요.</p>
        <button className={whiteButton} type="button" onClick={loginAlertHandler}>
          확인
        </button>
      </div>
    );
  } else if (userData && !userData.item.user.item.phone && !userData.item.user.item.bio) {
    return (
      <div className={boxClassName}>
        <Image className={boxClassName} src={'/check.png'} width={24} height={24} alt="체크" />
        <p className="mb-8">내 프로필을 먼저 등록해 주세요.</p>
        <button className={whiteButton} type="button" onClick={ProfileAlertHandler}>
          확인
        </button>
      </div>
    );
  } else if (userData && status === 'pending') {
    return (
      <div className={boxClassName}>
        <Image className={boxClassName} src={'/check.png'} width={24} height={24} alt="체크" />
        <p className="mb-8">신청을 취소하시겠어요?</p>
        <div className="w-full flex items-center justify-center gap-2">
          <button className={whiteButton} type="button" onClick={modalClose}>
            아니오
          </button>
          <button className={orangeButton} type="button" onClick={() => handler}>
            취소하기
          </button>
        </div>
      </div>
    );
  }
};

export default NoticeModalItem;
