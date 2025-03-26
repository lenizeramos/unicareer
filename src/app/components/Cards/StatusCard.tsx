export interface IStatusCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}

const StatusCard = ({
  title,
  value,
  icon,
  color,
  backgroundColor,
}: IStatusCardProps) => {
  return (
    <div className={`rounded-lg shadow p-6 ${backgroundColor}`}>
      <div className="flex justify-between">
        <div>
          <p className={`text-sm font-medium ${color}`}>{title}</p>
          <p className={`text-3xl font-bold text-white mt-2 ${color}`}>
            {value}
          </p>
        </div>
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}
        >
          <span className={`${color}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
