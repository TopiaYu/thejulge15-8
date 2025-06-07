'use client';

import NoticeInfo from '@/components/notice-detail/NoticeInfo';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  params: { id: string };
}

interface NoticeData {
  noticeId: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shopId: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  shopDescription: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const NoticeDetail = ({ params }: Props) => {
  const [notice, setNotice] = useState<NoticeData>({
    noticeId: '',
    hourlyPay: 0,
    startsAt: '',
    workhour: 0,
    description: '',
    closed: false,
    shopId: '',
    name: '',
    category: '',
    address1: '',
    address2: '',
    shopDescription: '',
    imageUrl: '',
    originalHourlyPay: 0,
  });
  const searchParams = useSearchParams();
  const shopId = searchParams.get('shop');
  const noticeId = params.id;

  const getNotice = async () => {
    try {
      const res = await axios.get(`shops/${shopId}/notices/${noticeId}/`);
      const data = res.data;
      setNotice({
        noticeId: data.item.id,
        hourlyPay: data.item.hourlyPay,
        startsAt: data.item.startsAt,
        workhour: data.item.workhour,
        description: data.item.description,
        closed: data.item.closed,
        shopId: data.item.shop.item.id,
        name: data.item.shop.item.name,
        category: data.item.shop.item.category,
        address1: data.item.shop.item.address1,
        address2: data.item.shop.item.address2,
        shopDescription: data.item.shop.item.description,
        imageUrl: data.item.shop.item.imageUrl,
        originalHourlyPay: data.item.shop.item.originalHourlyPay,
      });
    } catch (error) {
      console.error('공고 조회 에러', error);
    }
  };
  console.log(notice);

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div>
      <NoticeInfo info={notice} />
    </div>
  );
};

export default NoticeDetail;
