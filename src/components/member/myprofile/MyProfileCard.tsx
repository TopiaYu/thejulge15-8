//내프로필 상세페이지에서 사용하는 프로필 카드 컴포넌트
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
    <div className="bg-[#FFEBE7] p-5 lg:p-8 rounded-md w-full lg:max-w-[665px] h-[256px]">
      {/* 상단 - 이름, 편집 버튼 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[#EA3C12] font-bold text-[16px] mb-1">이름</p>
          <p className="text-[#111322] text-[28px] font-bold">{name}</p>
        </div>
        <button
          onClick={onEdit}
          className="w-[108px] lg:w-[169px] px-3 py-1 h-[48px] border border-[#EA3C12] font-bold text-[#EA3C12] bg-white rounded-md hover:bg-[#EA3C12] hover:text-white"
        >
          편집하기
        </button>
      </div>

      {/* 전화번호 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-[#7D7986] mb-1">
          <div className="relative w-4 h-4 sm:w-5 sm:h-5">
            <Image src="/phone.png" fill alt="전화번호" />
          </div>
          <span>{phone}</span>
        </div>

        {/* 선호 지역 */}
        <div className="flex items-center gap-2 text-sm text-[#7D7986] mb-1">
          <div className="relative w-4 h-4 sm:w-5 sm:h-5">
            <Image src="/location.png" fill alt="주소" />
          </div>
          <span>선호 지역: {region}</span>
        </div>

        {/* 소개 */}
        <p className="text-sm text-[#111322] mt-1">{bio}</p>
      </div>
    </div>
  );
};

export default MyProfileCard;
