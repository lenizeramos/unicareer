import { ProgressBarProps } from "../Types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalLength,
  value
}) => {
  const filledSegments = Math.min(value, totalLength);
  const emptySegments = totalLength - filledSegments;
  const filledArray = new Array(filledSegments).fill('#6ce0ba');
  const emptyArray = new Array(emptySegments).fill('#e5e7eb');
  const barArray = [...filledArray, ...emptyArray];

  return (
    <div className="flex h-1 w-full rounded-full">
      {barArray.map((color, index) => (
        <div
          key={index}
          style={{
            width: `${100 / totalLength}%`,
            height: "100%",
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
