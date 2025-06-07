interface WorkHourProps {
  startsAt: string;
  workhour: number;
}

const WorkHour = ({ startsAt, workhour }: WorkHourProps) => {
  const date = new Date(startsAt);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, '0');
  const day = String(date?.getDay() + 1).padStart(2, '0');
  const hour = String(date?.getHours()).padStart(2, '0');
  const minute = String(date?.getMinutes()).padStart(2, '0');
  return (
    <>{`${year}.${month}.${day} ${hour}:${minute} ~ ${Number(hour) + workhour} (${workhour})`}</>
  );
};

export default WorkHour;
