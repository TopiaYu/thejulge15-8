//모달 컴포넌트
'use client';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal = ({ message, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-[#000000B2] bg-opacity-30">
      <div className="bg-white w-[90%] max-w-[540px] h-[220px] sm:h-[250px] rounded-lg p-6 text-center shadow-md flex flex-col justify-center">
        <p className="text-base text-[#111322] text-center mt-12 mb-6">{message}</p>
        {/* 확인 버튼 */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={onClose}
            className="w-[120px] h-[48px] bg-[#ea3c12] text-white rounded-md hover:bg-orange-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
