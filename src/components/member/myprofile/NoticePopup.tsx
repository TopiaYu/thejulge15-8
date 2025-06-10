//공고 알림 팝업 컴포넌트
//승인&거절 따른 clsx 디자인 추가 예정
'use client';

interface NoticePopupProps {
  notices: { message: string; timeAgo: string }[];
  onClose: () => void;
}

const NoticePopup = ({ notices, onClose }: NoticePopupProps) => {
  return (
    <div className="absolute right-10 top-0 mt-16 w-[368px] bg-[#FFEBE7] border border-[#CBC9CF] rounded-[10px] shadow-md p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-[20px] text-[#111322]">알림 {notices.length}개</span>
        {/* //닫기버튼 임시로 설정함(디자인 체크) */}
        <button onClick={onClose}>X</button>
      </div>
      <ul className="space-y-3">
        {notices.map((notice, idx) => (
          <li
            key={idx}
            className="bg-white p-3 rounded-[5px] shadow-sm border border-[#E5E5E5] text-sm text-[#111322]"
          >
            {notice.message}
            <div className="text-xs text-[#A4A1AA] mt-1">{notice.timeAgo}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticePopup;
