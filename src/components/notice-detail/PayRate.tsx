import Image from 'next/image';
interface PayRateProps {
  hourlyPay: number;
  originalPay: number;
  closed: boolean;
  className: string;
  imgClass?: string;
}

const PayRate = ({ hourlyPay, originalPay, closed, className, imgClass = '' }: PayRateProps) => {
  const rate = Math.floor(((hourlyPay - originalPay) / originalPay) * 100);
  return (
    <>
      {rate < 0 || rate === 0 ? null : (
        <>
          <span>기존 시급보다</span>
          <span>{rate}%</span>
          <div className={className}>
            <Image
              src={'/arrow.png'}
              fill
              sizes="13px"
              alt="인상률"
              className={`h-[13px] ${imgClass} aspect-square`}
            />
            <Image
              src={'/arrow-orange.png'}
              fill
              sizes="13px"
              alt="인상률"
              className={`h-[13px] ${imgClass} aspect-square`}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PayRate;
