'use client';

interface NoticePopupProps {
  notices: string[]; // 알림 리스트
  onClose: () => void; // 닫기 함수
}

const NoticePopup = ({ notices, onClose }: NoticePopupProps) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-[300px] bg-[#FFF3F0] border border-gray-300 rounded-md shadow-md p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">알림 {notices.length}개</span>
        <button onClick={onClose}>X</button>
      </div>
      <ul className="text-sm text-[#111322] space-y-2">
        {notices.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default NoticePopup;
