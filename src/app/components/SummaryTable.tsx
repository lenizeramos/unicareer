import Image from "next/image";
import { ISummaryTable } from "../Types";
import { monthNames, statusTags } from "../constants";

const SummaryTable = ({ columnNames, data }: ISummaryTable) => {
  const statusNames = new Set(data.map((item) => item.status.toLowerCase()));
  const statusStyles = statusTags.filter((tag) => statusNames.has(tag.id));

  const getDate = (date: string) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = new Date(date);
    const month = monthNames[createDate.getMonth()];
    const year = createDate.getFullYear();
    return `${createDate.getDate()} ${month} ${year}`;
  };
  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <div className="grid [grid-template-columns:80px_2fr_2fr_1fr_1fr] gap-4 p-3 border-b bg-gray-50 font-semibold text-sm">
          {columnNames.map((column, index) => {
            return <p key={index}>{column}</p>;
          })}
        </div>
        {data.map((item, index) => {
          const statusTag = statusStyles.find(
            (tag) => tag.id === item.status.toLowerCase()
          );
          return (
            <div
              className="grid [grid-template-columns:80px_2fr_2fr_1fr_1fr] gap-4 py-3 border-b border-gray-100 text-sm px-3 items-center"
              key={index}
            >
              <p className="w-fit">{index + 1}</p>
              <div className="flex gap-2 w-fit items-center">
                <Image
                  src={"/img/Avatar.png"}
                  alt="logo"
                  width={45}
                  height={45}
                />
                <p>{item.companyName.name}</p>
              </div>
              <p>{item.jobTitle}</p>
              <p>{getDate(item.dateApplied)}</p>
              <p className={statusTag?.styles || ""}>
                {statusTag?.type || item.status}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SummaryTable;
