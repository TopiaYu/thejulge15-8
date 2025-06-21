import Image from 'next/image';
interface WorkHourProps {
  startsAt: string;
  workhour: number;
  className: string;
}

const WorkHour = ({ startsAt, workhour, className }: WorkHourProps) => {
  const date = new Date(startsAt);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, '0');
  const day = String(date?.getDate()).padStart(2, '0');
  const hour = String(date?.getHours()).padStart(2, '0');
  const minute = String(date?.getMinutes()).padStart(2, '0');
  const addHour = Number(hour) + workhour;
  const endHour = addHour > 24 ? addHour - 24 : addHour;
  return (
    <>
      <div className={className}>
        <Image src={'/time.png'} fill sizes="16px" className="aspect-square" alt="시간" />
      </div>
      {`${year}-${month}-${day} ${hour}:${minute}~${endHour}:${minute} (${workhour}시간)`}
    </>
  );
};

export default WorkHour;
