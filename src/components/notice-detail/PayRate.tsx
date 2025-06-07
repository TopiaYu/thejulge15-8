interface PayRateProps {
  hourlyPay: number;
  originalPay: number;
}

const PayRate = ({ hourlyPay, originalPay }: PayRateProps) => {
  const rate = ((hourlyPay - originalPay) / originalPay) * 100;
  return <>{rate}%</>;
};

export default PayRate;
