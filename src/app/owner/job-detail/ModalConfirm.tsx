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
    'border border-solid border-orange text-sm font-bold text-orange rounded-md py-2.5 px-5 w-[80px] h-[38px]';
  const orangeButton =
    'bg-orange text-sm font-bold text-white rounded-md py-2.5 px-5 w-[80px] h-[38px]';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000B2] backdrop-blur-sm">
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
