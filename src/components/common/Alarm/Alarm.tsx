import clsx from 'clsx';

interface NewAlarm {
  newAlarm: boolean;
  onClick: () => void;
}

const Alarm = ({ newAlarm, onClick }: NewAlarm) => {
  const className = clsx('w-2 h-2', newAlarm ? 'bg-[#EA3C12]' : 'bg-black', 'rounded-[9999px]');

  return (
    <div
      onClick={onClick}
      className="relative w-5 h-5 border-solid border-2 border-black rounded-md cursor-pointer"
    >
      <div className="absolute flex justify-center items-center w-3.5 h-3.5 rounded-[9999px] bg-white bottom-2 left-2.5 p-0.5">
        <div className={className}></div>
      </div>
    </div>
  );
};

export default Alarm;
