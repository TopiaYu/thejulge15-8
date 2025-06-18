import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

interface ModalConfirmProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalConfirm({ isOpen, message, onConfirm, onCancel }: ModalConfirmProps) {
  const boxClassName =
    'max-w-[298px] w-full relative -top-35 flex flex-col justify-center items-center bg-white p-6 rounded-xl text-base leading-[26px]';
  const whiteButton =
    'border border-solid border-orange text-sm text-orange rounded-md py-2.5 px-5';
  const orangeButton = 'bg-orange text-sm text-white rounded-md py-2.5 px-5';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className={boxClassName}>
        <Image className="mb-4" src={'/check.png'} width={24} height={24} alt="체크" />
        <p className="mb-8">{message}</p>
        <div className="w-full flex items-center justify-center gap-2">
          <button className={whiteButton} type="button" onClick={onCancel}>
            아니오
          </button>
          <button className={orangeButton} type="button" onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
}
