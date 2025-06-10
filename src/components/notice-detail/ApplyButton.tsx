'use client';

import { useCallback, useState } from 'react';
import axios from '@/lib/api/axios';
import clsx from 'clsx';
import useAuth from '@/lib/hooks/use-auth';
import NoticeModal from './modal/NoticeModal';
import NoticeModalItem from './modal/NoticeModalItem';

interface ApplyBtnProps {
  shopId: string;
  noticeId: string;
  closed: boolean;
}

interface ApplyValue {
  [key: string]: {
    text: string;
    handler: () => void;
    value: string;
  };
}

const ApplyButton = ({ shopId, noticeId, closed }: ApplyBtnProps) => {
  const [applyStatus, setApplyStatus] = useState({
    id: '',
    status: '',
    closed: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useAuth();
  const className = clsx(
    'w-full h-12 rounded-md bg-orange text-white font-bold text-sm sm:text-base cursor-pointer',
    applyStatus.status !== 'pending'
      ? 'bg-orange'
      : 'bg-white border-solid border-orange border-[1px]',
  );

  const applyHandler = async () => {
    if (!userData) {
      setIsOpen(!isOpen);
      return;
    }
    const res = await axios.post(`/shops/${shopId}/notices/${noticeId}/applications`);
    const data = res.data;
    setApplyStatus({
      id: data.item.id,
      status: data.item.status,
      closed: data.item.notice.closed,
    });
  };

  const applyCanceledHandler = useCallback(
    async (value: string) => {
      const res = await axios.put(
        `/shops/${shopId}/notices/${noticeId}/applications/${applyStatus.id}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${userData?.item.token}`,
          },
        },
      );
      const data = res.data;
      setApplyStatus({
        id: data.item.id,
        status: data.item.status,
        closed: data.item.notice.closed,
      });
    },
    [shopId, noticeId, applyStatus.id, userData?.item.token],
  );

  const handleCancel = useCallback(() => {
    applyCanceledHandler('canceled');
  }, [applyCanceledHandler]);

  const applyValue: ApplyValue = {
    '': {
      text: '신청하기',
      handler: applyHandler,
      value: '',
    },
    pending: {
      text: '취소하기',
      handler: () => applyCanceledHandler('canceled'),
      value: 'canceled',
    },
    canceled: {
      text: '신청하기',
      handler: applyHandler,
      value: '',
    },
  };

  return (
    <>
      <button
        type="button"
        className={!closed ? className : 'bg-gray-40'}
        value={applyValue[applyStatus.status].value}
        onClick={applyValue[applyStatus.status].handler}
      >
        {!closed ? applyValue[applyStatus.status].text : '신청 불가'}
      </button>
      {isOpen && (
        <NoticeModal>
          <NoticeModalItem
            status={applyStatus.status}
            handler={handleCancel}
            modalClose={() => setIsOpen(!isOpen)}
          />
        </NoticeModal>
      )}
    </>
  );
};

export default ApplyButton;
