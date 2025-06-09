'use client';

import LoginSignAuthFormWrapper from '../../components/LoginSignAuthFormWrapper';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import axios from '../../lib/api/axios';
import * as Axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [role, setRole] = useState<'user' | 'owner'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const onEmailBlur = () => {
    setEmailError(validateEmail(email) ? '' : '이메일 형식으로 작성해 주세요.');
  };

  const onPasswordBlur = () => {
    setPasswordError(password.length < 8 ? '8자 이상 입력해주세요.' : '');
  };

  const onPasswordConfirmBlur = () => {
    setPasswordConfirmError(password !== passwordConfirm ? '비밀번호가 일치하지 않습니다.' : '');
  };

  const isFormValid =
    validateEmail(email) &&
    password.length >= 8 &&
    password === passwordConfirm &&
    !emailError &&
    !passwordError &&
    !passwordConfirmError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('입력값을 확인해주세요: 이메일 형식, 비밀번호 길이, 비밀번호 확인');
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        email,
        password,
        type: role === 'user' ? 'employee' : 'employer',
      };

      await axios.post('/users', requestData);

      alert('가입이 완료되었습니다');
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);

      let errorMessage = '회원가입 중 오류가 발생했습니다.';

      if (Axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          setShowDuplicateModal(true);
          return;
        } else if (status === 400) {
          errorMessage = `잘못된 요청: ${data.message || '입력 데이터를 확인해주세요.'}`;
        } else {
          errorMessage = `서버 오류 (${status}): ${data.message || '알 수 없는 오류'}`;
        }
      } else if (error instanceof Error) {
        errorMessage = `요청 중 오류가 발생했습니다: ${error.message}`;
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginSignAuthFormWrapper>
      <div className="mb-8 cursor-pointer" onClick={() => router.push('/posts')}>
        <Image
          src="/logo.png"
          alt="더줄게 로고"
          width={248}
          height={45}
          className="w-[208px] h-[38px] sm:w-[248px] sm:h-[45px] mx-auto"
        />
      </div>

      <form className="space-y-7" onSubmit={handleSubmit} noValidate>
        <label>
          <span className="block mb-[13px]">이메일</span>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className={`w-full border rounded px-3 py-2 ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onEmailBlur}
          />
          <p className={`text-sm mt-1 min-h-[20px] ${emailError ? 'text-red-500' : 'invisible'}`}>
            {emailError || 'placeholder'}
          </p>
        </label>

        <label>
          <span className="block mb-[13px]">비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={`w-full border rounded px-3 py-2 ${passwordError ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={onPasswordBlur}
          />
          <p
            className={`text-sm mt-1 min-h-[20px] ${passwordError ? 'text-red-500' : 'invisible'}`}
          >
            {passwordError || 'placeholder'}
          </p>
        </label>

        <label>
          <span className="block mb-[13px]">비밀번호 확인</span>
          <input
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            className={`w-full border rounded px-3 py-2 ${
              passwordConfirmError ? 'border-red-500' : ''
            }`}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={onPasswordConfirmBlur}
          />
          <p
            className={`text-sm mt-1 min-h-[20px] ${
              passwordConfirmError ? 'text-red-500' : 'invisible'
            }`}
          >
            {passwordConfirmError || 'placeholder'}
          </p>
        </label>

        <div>
          <label className="block mb-[13px] text-sm font-medium text-gray-700">회원 유형</label>
          <div className="flex space-x-4">
            {[
              { label: '알바님', value: 'user' },
              { label: '사장님', value: 'owner' },
            ].map(({ label, value }) => (
              <label
                key={value}
                className={`flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer transition-all flex-1 ${
                  role === value
                    ? 'border-[#EA3A00] text-[#EA3A00]'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  className="hidden"
                  checked={role === value}
                  onChange={() => setRole(value as 'user' | 'owner')}
                />
                <div
                  className={`w-4 h-4 rounded-full mr-2 border flex items-center justify-center ${
                    role === value ? 'bg-[#EA3A00] text-white border-[#EA3A00]' : 'border-gray-300'
                  }`}
                >
                  {role === value && (
                    <svg
                      className="w-2 h-2"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {label}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-2 rounded text-white ${
            isFormValid && !isLoading ? 'bg-[#EA3A00]' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isLoading ? '처리 중...' : '가입하기'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        이미 가입하셨나요?{' '}
        <Link href="/login" className="text-blue-600 underline">
          로그인하기
        </Link>
      </p>

      {showDuplicateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="mb-4 text-center text-red-600 font-semibold">
              이미 사용중인 이메일입니다
            </p>
            <button
              onClick={() => setShowDuplicateModal(false)}
              className="w-full bg-[#EA3A00] text-white py-2 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </LoginSignAuthFormWrapper>
  );
}
