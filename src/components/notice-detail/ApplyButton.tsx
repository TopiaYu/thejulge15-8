'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from '@/lib/api/axios';
import clsx from 'clsx';
import useAuth from '@/lib/hooks/use-auth';
import NoticeModal from './modal/NoticeModal';
import NoticeModalItem from './modal/NoticeModalItem';
import useToken from '@/lib/hooks/use-token';
import { Notice, Shop } from '@/types/types';
import useCancelId from '@/lib/hooks/notice-detail/use-cancel-id';

interface ApplyBtnProps {
  shopId: string;
  noticeId: string;
  closed: boolean;
  isPast: boolean;
}

interface CheckStatusItem {
  item: {
    createdAt: string;
    id: string;
    notice: Notice;
    shop: Shop;
    status: string;
    user: {
      href: string;
      item: {
        email: string;
        id: string;
        type: string;
      };
    };
  };
}

interface ApplicationList {
  count: number;
  hasNext: boolean;
  items: CheckStatusItem[];
}

const ApplyButton = ({ shopId, noticeId, closed, isPast }: ApplyBtnProps) => {
  const [applyStatus, setApplyStatus] = useState({
    id: '',
    status: '',
    closed: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [applicationList, setApplicationList] = useState<ApplicationList>();
  const { userData } = useAuth();
  const { cancelData, addApplyItems, removeApplyItem } = useCancelId();
  const token = useToken();

  //  className
  const className = clsx(
    applyStatus.status !== 'pending'
      ? 'bg-orange text-white'
      : 'bg-white border-solid border-orange border-[1px] text-orange',
  );

  const applyHandler = async () => {
    if (!userData || !userData.item.user.item.phone) {
      setIsOpen(!isOpen);
      return;
    }

    try {
      const res = await axios.post(
        `/shops/${shopId}/notices/${noticeId}/applications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = res.data;
      console.log(data);

      setApplyStatus({
        id: data.item.id,
        status: data.item.status,
        closed: data.item.notice.closed,
      });
      if (userData) {
        addApplyItems(userData?.item.user.item.id, {
          noticeId: noticeId,
          applicationId: data.item.id,
        });
      }
    } catch (error) {
      console.error('신청 실패:', error);
    }
  };

  const applyCanceledHandler = useCallback(
    async (value: string) => {
      const userId = userData?.item.user.item.id;
      if (!userId || !cancelData) return;

      const application = cancelData[userId]?.apply?.filter(
        (item) => item.noticeId === noticeId && item.applicationId === applyStatus.id,
      );

      if (!application || application.length === 0) return;

      try {
        const res = await axios.put(
          `/shops/${shopId}/notices/${noticeId}/applications/${application[0]?.applicationId}`,
          { status: value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = res.data;

        setApplyStatus({
          id: data.item.id,
          status: data.item.status,
          closed: data.item.notice.closed,
        });
        removeApplyItem(userId, data.item.id);
      } catch (error) {
        console.error('취소 신청 중 오류 발생:', error);
      }
    },
    [shopId, noticeId, token, cancelData, userData],
  );

  const handleCancel = useCallback(() => {
    if (applyStatus.status === 'pending') {
      setIsOpen(true);
    }
  }, [applyStatus.status]);

  const confirmCancel = () => {
    applyCanceledHandler('canceled');
    setIsOpen(false);
  };

  useEffect(() => {
    const getNoticeApply = async () => {
      try {
        const res = await axios.get(
          `/shops/${shopId}/notices/${noticeId}/applications?offset=0&limit=50`,
        );
        const data = res.data;
        setApplicationList(data);
      } catch (error) {
        console.error('지원 목록 조회 실패:', error);
      }
    };
    getNoticeApply();
  }, [shopId, noticeId]);

  useEffect(() => {
    if (!applicationList || !userData) return;

    const userItem = applicationList.items.find(
      (item) => item.item.user.item.id === userData?.item.user.item.id,
    );

    if (userItem) {
      setApplyStatus((prev) => ({
        ...prev,
        status: userItem.item.status,
      }));
    }
  }, [applicationList]);

  const getButtonText = () => {
    if (closed || isPast) return '신청 불가';
    if (applyStatus.status === 'pending') return '취소하기';
    return '신청하기';
  };
  const getHandler = () => {
    if (closed || isPast) return null;
    if (applyStatus.status === 'pending') return handleCancel;

    return applyHandler;
  };

  return (
    <>
      <button
        type="button"
        className={`${closed || isPast ? 'bg-gray-40 text-white' : className} w-full h-12 rounded-md font-bold text-sm sm:text-base cursor-pointer`}
        onClick={getHandler() || undefined}
      >
        {getButtonText()}
      </button>
      {isOpen && (
        <NoticeModal>
          <NoticeModalItem
            status={applyStatus.status}
            handler={confirmCancel}
            modalClose={() => setIsOpen(!isOpen)}
          />
        </NoticeModal>
      )}
    </>
  );
};

export default ApplyButton;
