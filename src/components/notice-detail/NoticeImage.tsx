import Image from 'next/image';

interface NoticeImage {
  imageUrl: string;
  name: string;
  closed: boolean;
  className: string;
  isPast: boolean;
}

const NoticeImage = ({ imageUrl, name, closed, className, isPast }: NoticeImage) => {
  return (
    <div className={className}>
      {imageUrl !== '' ? <Image fill src={imageUrl} alt={name} className="object-cover" /> : ''}
      {closed && (
        <div className="flex justify-center items-center text-lg sm:text-2xl text-gray-30 absolute w-full h-full top-0 left-0 bg-black opacity-50 z-10">
          마감 완료
        </div>
      )}
      {isPast && (
        <div className="flex justify-center items-center text-lg sm:text-2xl text-gray-30 absolute w-full h-full top-0 left-0 bg-black opacity-50 z-10">
          지난 공고
        </div>
      )}
    </div>
  );
};

export default NoticeImage;
