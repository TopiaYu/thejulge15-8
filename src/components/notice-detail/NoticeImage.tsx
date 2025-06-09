import Image from 'next/image';

interface NoticeImage {
  imageUrl: string;
  name: string;
  closed: boolean;
  className: string;
}

const NoticeImage = ({ imageUrl, name, closed, className }: NoticeImage) => {
  return (
    <div className={className}>
      {imageUrl !== '' ? <Image fill src={imageUrl} alt={name} /> : ''}
      {closed && (
        <div className="flex justify-center items-center text-lg sm:text-2xl text-gray-30 absolute w-full h-full bg-black opacity-15 z-10">
          마감 완료
        </div>
      )}
    </div>
  );
};

export default NoticeImage;
