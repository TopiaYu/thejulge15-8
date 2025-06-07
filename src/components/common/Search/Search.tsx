import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?keyword=${value}`);
  };

  return (
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
        value={value}
        onChange={(e) => onChange(e)}
      />
    </form>
  );
};

export default Search;
