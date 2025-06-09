'use client';
import axios from '@/lib/api/axios';
import { useState } from 'react';

const Notice = () => {
  const [token, setToken] = useState();
  const mockDataLogin = async () => {
    const res = await axios.post('/token', {
      email: 'kimcodeit@example.com',
      password: '12345',
    });
    const data = res.data;
    setToken(data.item.token);
    console.log(data.item.token);
  };

  const mockDataShop = async () => {
    const res = await axios.post(
      '/shops',
      {
        name: '배고파~',
        category: '한식',
        address1: '서울시 종로구',
        address2: '한국 어딘가',
        description: '밥 언제 다 돼',
        imageUrl:
          'https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png',
        originalHourlyPay: 10000,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = res;
    console.log(data);
  };

  const mockDataNotice = async () => {
    const res = await axios.post(
      '/shops/946ee70a-2c01-47b2-b349-a7608be2759e/notices',
      {
        hourlyPay: 15000,
        startsAt: '2025-07-07T18:00:00.000Z',
        workhour: 3,
        description: '배고파아아아아',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = res;
    console.log(data);
  };

  return (
    <>
      <div>공지</div>
      <button onClick={mockDataLogin}>클릭!</button>
      <button onClick={mockDataShop}>클릭!!</button>
      <button onClick={mockDataNotice}>클릭!!!</button>
    </>
  );
};

export default Notice;
