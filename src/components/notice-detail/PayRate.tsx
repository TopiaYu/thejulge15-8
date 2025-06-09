import Image from 'next/image';
interface PayRateProps {
  hourlyPay: number;
  originalPay: number;
  closed: boolean;
  className: string;
  imgClass?: string;
}

const PayRate = ({ hourlyPay, originalPay, closed, className, imgClass = '' }: PayRateProps) => {
  const rate = ((hourlyPay - originalPay) / originalPay) * 100;
  return (
    <>
      <span>기존 시급보다</span>
      <span>{rate}%</span>
      <div className={className}>
        <Image src={'/arrow.png'} fill alt="인상률" className={`h-[13px] ${imgClass}`} />
        <Image src={'/arrow-orange.png'} fill alt="인상률" className={`h-[13px] ${imgClass}`} />
      </div>
    </>
  );
};

export default PayRate;
