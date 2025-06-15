'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '@/components/member/Modal';
import { useRouter } from 'next/navigation';
import useToken from '@/lib/hooks/use-token';
import axios from 'axios';

//api 공고 등록에 필요한 body
interface JobPostRequestBody {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

//응답 타입 명시
interface JobPostDetailResponseItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: {
      id: string;
      name: string;
      category: string;
      address1: string;
      address2: string;
      description: string;
      imageUrl: string;
      originalHourlyPay: number;
    };
    href: string;
  };
}

export default function JobPostFormPage() {
  const [hourlyPay, sethourlyPay] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [workHours, setWorkHours] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const isFormValid =
    hourlyPay.length > 0 &&
    startDate.length > 0 &&
    workHours.length > 0 &&
    jobDescription.length > 0;

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newRegisteredId, setNewRegisteredId] = useState<string | null>(null);

  const router = useRouter();
  const token = useToken();

  const Hardcooded_shop_id = 'cc5003b4-870f-4adb-bfe2-d906c33d04b7';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    const selectedDate = new Date(startDate);
    const fullStartsAtDateTime = `${startDate}T09:00:00Z`; // YYYY-MM-DDTHH:MM:SSZ
    if (new Date(fullStartsAtDateTime).getTime() < Date.now()) {
      setError('시작 일시는 현재 시간보다 미래여야 합니다.');
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      setError('로그인이 필요, 토큰을 찾을 수 없음');
      setIsSubmitting(false);
      router.push('/login');
      return;
    }
    const requestBody: JobPostRequestBody = {
      hourlyPay: Number(hourlyPay),
      description: jobDescription,
      startsAt: fullStartsAtDateTime,
      workhour: Number(workHours),
    };

    try {
      const response = await axios.post<{ item: JobPostDetailResponseItem }>(
        `https://bootcamp-api.codeit.kr/api/15-8/the-julge/shops/${Hardcooded_shop_id}/notices`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('공고 등록 성공', response.data);
      alert('공고 등록 완료'); // 추후 삭제
      setNewRegisteredId(response.data.item.id);

      setShowModal(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
        setError(err.response?.data?.message || '등록 실패');
        if (err.response?.status === 401) {
          setError('다시 로그인 하세요');
          router.push('/login');
        }
      } else {
        console.error('알수없는 오류 발생:', err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    //라우터 이동
    if (newRegisteredId) {
      router.push(`/owner/job-detail/${Hardcooded_shop_id}/${newRegisteredId}`);
    } else {
      router.push('/owner/owner-store-detail');
    }
  };

  return (
    <div className="w-full max-w-[964px] p-8 max-[375px]:p-4 flex flex-col justify-center mx-auto">
      <header className="flex justify-between mb-8">
        <h1 className="text-lg sm:text-2xl font-bold">공고등록</h1>
        <button className="cursor-pointer" onClick={() => router.push('/owner/owner-store-detail')}>
          <Image
            src="/close-icon.png"
            width={24}
            height={24}
            className="sm:w-8 sm:h-8"
            alt="exit"
          />
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="wage" className="mb-2">
              시급
            </label>
            <div className="relative w-full">
              <input
                id="wage"
                type="number"
                placeholder="10,000"
                onChange={(e) => {
                  sethourlyPay(e.target.value);
                }}
                className="p-3 border border-solid border-gray-300 rounded-md w-full
                            appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-50 pointer-events-none">
                원
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="start-date" className="mb-2">
              시작 일시
            </label>
            <input
              id="start-date"
              type="date"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              placeholder="2020-02-04"
              className="p-3 border border-solid border-gray-300 text-gray-50 rounded-md w-full"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="working-time" className="mb-2">
              업무 시간
            </label>
            <div className="relative">
              <input
                id="working-time"
                type="number"
                placeholder="6"
                onChange={(e) => {
                  setWorkHours(e.target.value);
                }}
                className="p-3 border border-solid border-gray-300 rounded-md w-full
                            appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ></input>
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-50 pointer-events-none">
                시간
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 ">
          <label htmlFor="job-info" className="mb-2">
            공고설명
          </label>
          <textarea
            id="job-info"
            placeholder="공고에 대한 기본적인 설명을 해주세요"
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
            className="p-2 border border-solid border-gray-300 rounded-md h-[153px] resize-none"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`cursor-pointer transition-colors duration-300 ease-in-out custom-button 
                    w-[351px] h-[48px] max-w-full rounded-md
                    ${
                      isFormValid && !isSubmitting
                        ? ' bg-orange hover:bg-orange-700 text-white '
                        : ' bg-gray-30 cursor-not-allowed'
                    }
                    `}
          >
            등록하기
          </button>
        </div>
      </form>

      {showModal && (
        <div className="max-w-[330px]">
          <Modal message="등록이 완료되었습니다." onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}
