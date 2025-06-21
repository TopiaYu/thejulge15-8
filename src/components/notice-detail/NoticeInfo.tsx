import PayRate from './PayRate';
import WorkHour from './WorkHour';
import NoticeImage from './NoticeImage';
import ApplyButton from './ApplyButton';
import Image from 'next/image';
import useAuth from '@/lib/hooks/use-auth';

interface NoticeInfo {
  noticeId: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shopId: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  shopDescription: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const NoticeInfo = ({ info, isPast }: { info: NoticeInfo; isPast: boolean }) => {
  const { userData } = useAuth();
  const className =
    'relative p-6 w-full rounded-xl overflow-hidden min-h-[178px] sm:h-full mb-3 md:mb-0 sm:mb-4';
  const rateArrow = 'relative w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]';
  const timeClass = 'relative w-4 h-4 sm:w-5 sm:h-5';
  const imgClass = 'last:hidden';

  if (info.noticeId === '') return null;

  return (
    <div className="max-w-[936px] w-full h-">
      <p className="text-orange text-sm sm:text-base font-bold mb-2">
        {info.category ? info.category : ''}
      </p>
      <h3 className="text-[#111322] text-lg sm:text-2xl font-bold mb-4 sm:mb-6 ">{info.name}</h3>
      <div className="p-5 sm:p-6 bg-white border-solid border-[#E5E4E7] border-[1px] rounded-xl flex flex-col md:flex-row md:gap-[30px] md:h-[356px] h-[480px] sm:h-[717px] mb-6">
        <NoticeImage
          imageUrl={info.imageUrl}
          name={info.name}
          closed={info.closed}
          className={className}
          isPast={isPast}
        />
        <div className="flex flex-col items-start justify-between md:max-w-[346px] w-full h-full">
          <div>
            <p className="text-orange text-sm sm:text-base font-bold">시급</p>
            <div className="text-[#111322] text-xl sm:text-2xl font-bold flex items-center gap-2 mb-3 text-ellipsis">
              {info?.hourlyPay.toLocaleString()}원
              {info?.hourlyPay <= info?.originalHourlyPay ? null : (
                <span className="flex items-center bg-orange rounded-[20px] text-white text-xs sm:text-sm font-normal sm:font-bold py-2 px-3 gap-1.5">
                  <PayRate
                    hourlyPay={info?.hourlyPay}
                    originalPay={info?.originalHourlyPay}
                    closed={info.closed}
                    className={rateArrow}
                    imgClass={imgClass}
                  />
                </span>
              )}
            </div>
            <div className="text-gray-50 text-sm sm:text-base flex items-center gap-1.5 mb-3">
              <WorkHour startsAt={info.startsAt} workhour={info.workhour} className={timeClass} />
            </div>
            <div className="text-gray-50 text-sm sm:text-base flex items-center gap-1.5 mb-3">
              <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                <Image src={'/location.png'} fill alt="주소" />
              </div>
              {info.address1}
            </div>
            <div className="text-[#111322] text-sm sm:text-base mb-6 md:mb-3.5 sm:mb-10">
              {info.shopDescription}
            </div>
          </div>
          {userData?.item.user.item.type !== 'employer' && (
            <ApplyButton
              shopId={info.shopId}
              noticeId={info.noticeId}
              closed={info.closed}
              isPast={isPast}
            />
          )}
        </div>
      </div>
      <div className="bg-gray-10 rounded-xl p-8 mb-[60px] text-sm sm:text-base">
        <p className="font-bold text-black pb-3 leading-5">공고 설명</p>
        {info.description}
      </div>
    </div>
  );
};

export default NoticeInfo;
