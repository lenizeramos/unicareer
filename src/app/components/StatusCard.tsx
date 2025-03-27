import { IStatusCardProps } from "../Types";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

const StatusCard = ({
  title,
  value,
  icon,
  color,
  backgroundColor,
  trend,
  percentage,
}: IStatusCardProps) => {
  return (
    <div className={`rounded-lg shadow p-6 ${backgroundColor}`}>
      <div className="flex justify-between">
        <div>
          <p className={`text-sm font-medium ${color}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        {trend ? (
          <div
            className={`flex items-center ${
              trend === "up" ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            <span className="text-sm font-medium mr-1">{percentage}</span>
            {trend === "up" ? (
              <GoArrowUp className="ml-1 text-lg" />
            ) : (
              <GoArrowDown className="ml-1 text-lg" />
            )}
          </div>
        ) : (
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}
          >
            <span className={`${color}`}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
