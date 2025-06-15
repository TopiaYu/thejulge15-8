//알바님 내 프로필 등록하기 패이지
'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/member/Modal';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/use-auth';
import axios from '@/lib/api/axios';
import useToken from '@/lib/hooks/use-token';

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
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const token = useToken();
  const { userData } = useAuth();

  const isFormValid = name.trim() !== '' && phone.trim() !== '';

  const formatPhoneNumber = (value: string) => {
    // 숫자만 남기기
    const numbersOnly = value.replace(/\D/g, '');

    // 01X-XXXX-XXXX 형식으로
    if (numbersOnly.length < 4) {
      return numbersOnly;
    } else if (numbersOnly.length < 8) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    } else if (numbersOnly.length <= 11) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7)}`;
    } else {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
    }
  };

  // 유저 정보 불어오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = userData?.item.user.item.id;
      if (!userId || !token) return;

      try {
        const response = await axios.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.item;

        setName(user.name || '');
        setPhone(user.phone ? formatPhoneNumber(user.phone) : '');
        setAddress(user.address || '');
        setBio(user.bio || '');
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, [userData, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = userData?.item.user.item.id;
    if (!isFormValid || !userId || !token) return;

    try {
      await axios.put(
        `/users/${userId}`,
        { name, phone, address, bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setShowModal(true); // 모달 열기
    } catch (error) {
      console.error('프로필 등록 실패:', error);
      alert('유효하지 않은 휴대폰 번호입니다.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false); //모달 닫고
    router.push('/member/myprofile'); // 내프로필 페이지로 이동
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
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              className="h-[58px] px-4 border border-[#CBC9CF] bg-white rounded-md"
            />
          </div>

          {/* 선호 지역 */}
          <div className="flex flex-col">
            <label htmlFor="address">선호 지역</label>
            <select
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
      {/* 모달 렌더링 */}
      {showModal && <Modal message="등록이 완료되었습니다." onClose={handleModalClose} />}
    </div>
  );
};

export default Page;
