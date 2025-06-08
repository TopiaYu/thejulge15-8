'use client';

import { useState } from 'react';

const regions = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구',
];

const Page = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [bio, setBio] = useState('');

  const isFormValid = name.trim() !== '' && phone.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log('등록폼 제출 콘솔테스트용:', { name, phone, region, bio });
  };

  return (
    <div className="w-full min-h-screen xl:px-[208px] md:px-16 sm:px-8 px-5 pt-10 bg-[#FAFAFA]">
      <h2 className="text-2xl font-extrabold text-[var(--color-black)] mb-6">내 프로필</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* 이름 */}
          <div className="flex flex-col">
            <label htmlFor="name">
              이름<span>*</span>
            </label>
            <input
              id="name"
              placeholder="입력"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[58px] px-4 border border-[#CBC9CF] bg-white rounded-md"
            />
          </div>

          {/* 연락처 */}
          <div className="flex flex-col">
            <label htmlFor="phone">
              연락처<span>*</span>
            </label>
            <input
              id="phone"
              placeholder="입력"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[58px] px-4 border border-[#CBC9CF] bg-white rounded-md"
            />
          </div>

          {/* 선호 지역 */}
          <div className="flex flex-col">
            <label htmlFor="region">선호 지역</label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="h-[58px] px-4 border border-[#CBC9CF] bg-white rounded-md"
            >
              <option value="">선택</option>
              {regions.map((regionName) => (
                <option key={regionName} value={regionName}>
                  {regionName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 소개 */}
        <div>
          <label htmlFor="bio">소개</label>
          <textarea
            id="bio"
            placeholder="입력"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-auto px-4 py-2 border border-[#CBC9CF] rounded-md bg-white no resize"
          />
        </div>
        {/* 등록 버튼 */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-[346px] h-[47px] bg-[#ea3c12] text-white rounded-md hover:bg-orange-700 font-bold"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
