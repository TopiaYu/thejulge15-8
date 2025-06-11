'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputValidator from '../Header/input-validator';
import { useEffect, useRef, useState } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [isBlurBlocking, setIsBlurBlocking] = useState(false);
  const [recently, setRecently] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const validate = InputValidator(value);
    const storage = localStorage.getItem('searched');
    const history = storage ? JSON.parse(storage) : [];

    if (!validate) {
      e.preventDefault();
      alert('검색어를 다시 입력해주세요!');
    }

    const oldHistory = history.filter((item: string) => item && value !== item);
    const updateHistory = [value, ...oldHistory].slice(0, 5);
    localStorage.setItem('searched', JSON.stringify(updateHistory));

    if (validate) {
      router.push(`/result?keyword=${value}`);
    }
  };

  const handleFocus = () => {
    if (value.length === 0) {
      setFocus(!isFocus);
    }
  };

  const handleBlur = () => {
    if (isBlurBlocking) {
      setIsBlurBlocking(false);
      return;
    }
    setFocus(false);
  };

  const liClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    const value = e.currentTarget.textContent;
    if (value !== null) {
      onChange(value);
      ref.current?.focus();
    }
    setIsBlurBlocking(true);
  };

  useEffect(() => {
    const searcedItem = localStorage.getItem('searched');
    if (!searcedItem) return;
    setRecently(JSON.parse(searcedItem));
  }, []);

  return (
    <div className="lg:max-w-[450px] md:max-w-[340px] w-full flex flex-col relative">
      <form
        className="mr-auto lg:max-w-[450px] md:max-w-[340px] w-full relative flex items-center col-start-1 row-start-2 col-span-2 text-sm sm:text-base sm:leading-[20px]"
        onSubmit={handleSubmit}
      >
        <Image
          src="/search.png"
          width={20}
          height={20}
          alt="검색하기"
          className="absolute left-2.5"
        />
        <input
          className="bg-gray-10 w-full h-10 rounded-[10px] px-2.5 pl-10"
          type="text"
          name="keyword"
          placeholder="가게 이름으로 찾아보세요"
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      {isFocus && value.length === 0 ? (
        <ul className="w-full absolute top-11 rounded-md p-1 flex flex-col gap-1 border border-solid border-gray-20 bg-gray-10">
          {recently.map((item) => {
            if (!item) return;
            return (
              <li
                className="hover:bg-gray-30 rounded-sm p-1"
                key={item}
                onMouseDown={(e) => liClickHandler(e)}
              >
                {item}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
