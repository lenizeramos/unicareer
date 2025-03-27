import { IMiniStatusCardProps } from "../Types";

const MiniStatusCard = ({
  title,
  value,
  trend,
  percentage,
}: IMiniStatusCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div
          className={`flex items-center ${
            trend === "up" ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          <span className="text-sm font-medium mr-1">{percentage}</span>
          {trend === "up" ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniStatusCard;
