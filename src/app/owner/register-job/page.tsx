'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '@/components/member/Modal';

export default function JobPostFormPage() {
  const [hourlyWage, setHourlyWage] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [workHours, setWorkHours] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const isFormValid =
    hourlyWage.length > 0 &&
    startDate.length > 0 &&
    workHours.length > 0 &&
    jobDescription.length > 0;

  const [showModal, setShowModal] = useState(false);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 데이터 보내기 (추가)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    //라우터 이동 (추가)
  };

  return (
    <div className="w-full max-w-[964px] p-8 max-[375px]:p-4 flex flex-col justify-center mx-auto">
      <header className="flex justify-between mb-8">
        <h1 className="text-lg sm:text-2xl font-bold">공고등록</h1>
        <button className="cursor-pointer" onClick={() => alert('이전창으로 가기')}>
          <Image
            src="/close-icon.png"
            width={24}
            height={24}
            className="sm:w-8 sm:h-8"
            alt="exit"
          />
        </button>
      </header>

      <form>
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
                  setHourlyWage(e.target.value);
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

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            onClick={handleButton}
            disabled={!isFormValid}
            className={`cursor-pointer transition-colors duration-300 ease-in-out custom-button 
                    w-[351px] h-[48px] max-w-full rounded-md
                    ${
                      isFormValid
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
