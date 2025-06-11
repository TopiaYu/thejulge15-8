'use client';

import Link from 'next/link';
import LoginSignAuthFormWrapper from '../../components/LoginSignAuthFormWrapper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '@/lib/hooks/use-auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  useEffect(() => {
    const valid = Boolean(email && password && validateEmail(email) && password.length >= 8);
    setIsFormValid(valid);
  }, [email, password]);

  const { login } = useAuth();

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email) ? '' : '이메일 형식으로 작성해 주세요.');
  };

  const handlePasswordBlur = () => {
    setPasswordError(password.length >= 8 ? '' : '8자 이상 작성해 주세요.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 8;

    setEmailError(isEmailValid ? '' : '이메일 형식으로 작성해 주세요.');
    setPasswordError(isPasswordValid ? '' : '8자 이상 작성해 주세요.');

    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await axios.post('https://bootcamp-api.codeit.kr/api/15-8/the-julge/token', {
        email,
        password,
      });
      login(response.data);
      const token = response.data?.item?.token;
      if (token) {
        localStorage.setItem('accessToken', token);
        router.push('/');
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <LoginSignAuthFormWrapper>
      <div className="text-center mb-8 cursor-pointer" onClick={() => router.push('/')}>
        <Image
          src="/logo.png"
          alt="더줄게 로고"
          width={248}
          height={45}
          className="w-[208px] h-[38px] sm:w-[248px] sm:h-[45px] mx-auto"
        />
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="block mb-1">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className={`w-full border rounded px-3 py-2 ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
          />
          <p className={`text-sm mt-1 min-h-[20px] ${emailError ? 'text-red-500' : 'invisible'}`}>
            {emailError || 'placeholder'}
          </p>
        </div>

        <div>
          <label className="block mb-1">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={`w-full border rounded px-3 py-2 ${passwordError ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          <p
            className={`text-sm mt-1 min-h-[20px] ${passwordError ? 'text-red-500' : 'invisible'}`}
          >
            {passwordError || 'placeholder'}
          </p>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded transition ${
            isFormValid
              ? 'bg-[#EA3A00] text-white hover:opacity-90'
              : 'bg-gray-300 text-white cursor-not-allowed'
          }`}
        >
          로그인 하기
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        회원이 아니신가요?{' '}
        <Link href="/sign" className="text-blue-600 underline">
          회원가입하기
        </Link>
      </p>
    </LoginSignAuthFormWrapper>
  );
}
