// MyProfileCard.tsx 알바 마이페이지 프로필 상단 카드 컴포넌트
'use client';

import Image from 'next/image';

interface MyProfileCardProps {
  name: string;
  phone: string;
  region: string;
  bio: string;
  onEdit: () => void;
}

const MyProfileCard = ({ name, phone, region, bio, onEdit }: MyProfileCardProps) => {
  return (
    <div className="bg-[#FFEBE7] p-4 rounded-md w-full max-w-[500px]">
      <div className="flex justify-between items-center mb-2 ">
        <p className="text-[#EA3C12] font-bold">이름</p>
        <p className="text-[#111322] text-[28px] font-bold">{name}</p>
        <button
          onClick={onEdit}
          className="px-3 py-1 w-[169px] h-[48px] border border-[#EA3C12] font-bold text-[#EA3C12] bg-[#FFFFFF] rounded-md"
        >
          편집하기
        </button>
      </div>

      {/* 전화번호 */}
      <div className="flex items-center gap-2 text-sm text-[#7D7986]">
        <div className="relative w-4 h-4 sm:w-5 sm:h-5">
          <Image src="/phone.png" fill alt="전화번호" />
        </div>
        <span>{phone}</span>
      </div>

      {/* 선호 지역 */}
      <div className="flex items-center gap-2 text-sm text-[#7D7986] mt-1">
        <div className="relative w-4 h-4 sm:w-5 sm:h-5">
          <Image src="/location.png" fill alt="주소" />
        </div>
        <span>선호 지역: {region}</span>
      </div>

      {/* 소개 */}
      <p className="text-sm text-[#111322] mt-1">{bio}</p>
    </div>
  );
};

export default MyProfileCard;
