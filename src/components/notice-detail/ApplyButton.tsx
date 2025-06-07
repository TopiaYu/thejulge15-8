'use client';

import { useState } from 'react';
import axios from '@/app/api/axios';

interface ApplyBtnProps {
  shopId: string;
  noticeId: string;
}

interface ApplyValue {
  [key: string]: {
    text: string;
    handler: () => void;
    value: string;
  };
}

const ApplyButton = ({ shopId, noticeId }: ApplyBtnProps) => {
  const [applyStatus, setApplyStatus] = useState({
    id: '',
    status: '',
    closed: false,
  });

  const applyHandler = async () => {
    const res = await axios.post(`/shops/${shopId}/notices/${noticeId}/applications`);
    const data = res.data;
    setApplyStatus({
      id: data.item.id,
      status: data.item.status,
      closed: data.item.notice.closed,
    });
  };

  const applyCanceledHandler = async (value: string) => {
    const res = await axios.put(
      '/shops/{shop_id}/notices/{notice_id}/applications/{application_id}',
      { status: value },
    );
    const data = res.data;
    setApplyStatus({
      id: data.item.id,
      status: data.item.status,
      closed: data.item.notice.closed,
    });
  };

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
    <button
      type="button"
      value={applyValue[applyStatus.status].value}
      onClick={applyValue[applyStatus.status].handler}
    >
      {applyValue[applyStatus.status].text}
    </button>
  );
};

export default ApplyButton;
