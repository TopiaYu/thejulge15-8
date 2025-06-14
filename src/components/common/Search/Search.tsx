'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import InputValidator from '../Header/input-validator';
import { useEffect, useRef, useState } from 'react';
import axios from '@/lib/api/axios';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

interface Recommend {
  id: string;
  name: string;
}

const Search = ({ value, onChange }: SearchProps) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [isBlurBlocking, setIsBlurBlocking] = useState(false);
  const [recently, setRecently] = useState<string[]>([]);
  const [recommend, setRecommend] = useState<Recommend[]>([]);
  const [liIndex, setLiIndex] = useState(-1);
  const ref = useRef<HTMLInputElement>(null);
  const recentlyRef = useRef<(HTMLLIElement | null)[]>([]);
  const recommendRef = useRef<(HTMLLIElement | null)[]>([]);
  const router = useRouter();
  const validate = InputValidator(value);
  const listClassName = 'bg-gray-30';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storage = localStorage.getItem('searched');
    const history = storage ? JSON.parse(storage) : [];

    if (!validate) {
      alert('검색어를 다시 입력해주세요!');
      return;
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
      setFocus(true);
    }
  };

  const handleBlur = () => {
    if (isBlurBlocking) {
      setIsBlurBlocking(false);
      return;
    }
    setFocus(false);
    setLiIndex(-1);
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

  const handleArrowBtn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const activeRef = value.length === 0 ? recentlyRef : recommendRef;
    const listLength = activeRef.current.length;
    let newIndex = liIndex;

    if (e.key === 'Enter') {
      const selectedItem = activeRef.current[newIndex]?.textContent;
      if (selectedItem) {
        onChange(selectedItem);
      }
    }

    if (e.key === 'ArrowDown') {
      newIndex = liIndex < listLength - 1 ? liIndex + 1 : 0;
    } else if (e.key === 'ArrowUp') {
      newIndex = liIndex > 0 ? liIndex - 1 : listLength - 1;
    } else {
      return;
    }

    activeRef.current.forEach((item) => {
      item?.classList.remove(listClassName);
    });

    activeRef.current[newIndex]?.classList.add(listClassName);

    setLiIndex(newIndex);
  };

  const handleMouseEnter = () => {
    const activeRef = value.length === 0 ? recentlyRef : recommendRef;
    activeRef.current.forEach((item) => {
      item?.classList.remove(listClassName);
    });
  };

  useEffect(() => {
    const searcedItem = localStorage.getItem('searched');
    if (!searcedItem) return;
    setRecently(JSON.parse(searcedItem));
  }, []);

  useEffect(() => {
    const keyword: Recommend[] = [];
    const autoComplete = async () => {
      try {
        const res = await axios.get(`/notices?keyword=${value}`);
        const data = res.data.items;

        for (const obj of data) {
          if (!obj) return;
          keyword.push({ id: obj.item.id, name: obj.item.shop.item.name });
        }
        setRecommend(keyword);
      } catch (err) {
        console.error('자동 완성 실패', err);
      }
    };

    if (value.length >= 2) {
      autoComplete();
    }

    if (ref.current === document.activeElement && value.length === 0) {
      setFocus(true);
    }
  }, [value]);

  console.log(recentlyRef.current);

  return (
    <div className="col-span-2 lg:max-w-[450px] md:max-w-[340px] w-full flex flex-col relative">
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
          onKeyDown={handleArrowBtn}
        />
      </form>
      {isFocus && value.length === 0 && recently.length > 0 ? (
        <ul className="w-full absolute top-11 rounded-md p-1 flex flex-col gap-1 border border-solid border-gray-20 bg-gray-10">
          {recently.length !== 0 &&
            recently.map((item, index) => {
              if (!item) return;
              return (
                <li
                  className="hover:bg-gray-30 rounded-sm p-1"
                  key={item}
                  ref={(el) => {
                    recentlyRef.current[index] = el;
                  }}
                  onMouseDown={liClickHandler}
                  onMouseEnter={handleMouseEnter}
                >
                  {item}
                </li>
              );
            })}
        </ul>
      ) : null}
      {recommend.length > 0 && value.length > 0 && (
        <ul className="w-full absolute top-11 rounded-md p-1 flex flex-col gap-1 border border-solid border-gray-20 bg-gray-10">
          {recommend.map((item, index) => {
            if (!item) return;
            return (
              <li
                ref={(el) => {
                  recommendRef.current[index] = el;
                }}
                className="hover:bg-gray-30 rounded-sm p-1"
                key={item.id}
                onMouseDown={liClickHandler}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
