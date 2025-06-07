'use client';

import Image from 'next/image';
import Search from './header/Search';
import { useState } from 'react';
import useAuth from '@/lib/use-auth';
import GuestMenu from './header/GuestMenu';
import UserMenu from './header/UserMenu';
import Link from 'next/link';

const Header = () => {
  const [value, setValue] = useState('');
  const { userData } = useAuth();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <header className="w-full md:h-[70px] h-[102px] grid grid-cols-2 grid-rows-2 md:flex md:items-center md:justify-between xl:px-[208px] md:px-16 sm:px-8 px-5 md:pt-0 pt-[18px]">
      <div className="relative sm:w-[108px] sm:h-[20px] w-[82px] h-[15px] md:mr-10 mr-[35px] col-start-1 row-start-1 md:mt-0">
        <Link href="/" className="relative w-full h-full inline-block">
          <Image src="/logo.png" fill alt="더줄게 로고" />
        </Link>
      </div>
      <Search value={value} onChange={inputHandler} />
      <div className="flex font-bold leading-5 lg:gap-10 sm:gap-3 gap-4 col-start-2 row-start-1 ml-auto text-sm sm:text-base sm:leading-[20px]">
        {!userData ? <GuestMenu /> : <UserMenu />}
      </div>
    </header>
  );
};

export default Header;
