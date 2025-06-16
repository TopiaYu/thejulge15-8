import Image from 'next/image';
import Search from '../Search/Search';
import { useState } from 'react';
import useAuth from '@/lib/hooks/use-auth';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';
import Link from 'next/link';

const Header = () => {
  const [value, setValue] = useState('');
  const { userData, isInitialized } = useAuth();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setValue(e);
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <header className="w-full md:h-[70px] h-[102px] grid grid-cols-2 grid-rows-2 md:flex md:items-center md:justify-between xl:px-[208px] lg:px-16 sm:px-8 px-5 md:pt-0 pt-[18px]">
      <div className="relative sm:w-[108px] sm:h-[20px] w-[82px] h-[15px] lg:mr-10 md:mr-8 mr-8 col-start-1 row-start-1 md:mt-0">
        <Link href="/" className="relative w-full h-full inline-block">
          <Image src="/logo.png" fill alt="더줄게 로고" />
        </Link>
      </div>
      <Search value={value} onChange={inputHandler} />
      <div className="flex items-start font-bold leading-5 lg:gap-10 sm:gap-3 gap-4 col-start-2 row-start-1 ml-auto text-sm sm:text-base sm:leading-[20px]">
        {isInitialized ? userData ? <UserMenu /> : <GuestMenu /> : null}
      </div>
    </header>
  );
};

export default Header;
