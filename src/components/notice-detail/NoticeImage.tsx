import Image from 'next/image';

interface NoticeImage {
  imageUrl: string;
  name: string;
  className: string;
}

const NoticeImage = ({ imageUrl, name, className }: NoticeImage) => {
  return (
    <div className={className}>
      {imageUrl !== '' ? <Image fill src={imageUrl} alt={name} /> : <p>이미지가 없습니다.</p>}
    </div>
  );
};

export default NoticeImage;
