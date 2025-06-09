//공고지원 내역 테이블 컴포넌트

'use client';

interface ApplyItem {
  id: number;
  title: string;
  status: string;
  date: string;
  hourlyPay: string;
}

interface ApplyTableProps {
  data: ApplyItem[];
}

const ApplyTable = ({ data }: ApplyTableProps) => {
  return (
    <table className="w-full text-left border border-[#ddd]">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">가게</th>
          <th className="p-2">일자</th>
          <th className="p-2">시급</th>
          <th className="p-2">상태</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{item.title}</td>
            <td className="p-2">{item.date}</td>
            <td className="p-2">{item.hourlyPay}</td>
            <td className="p-2">{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplyTable;
