import Image from "next/image";
import { dataFa } from "../constants";
import { ISummaryTable } from "../Types";
import { statusTags } from "../constants";

const SummaryTable = ({ columnNames, data }: ISummaryTable) => {
  // const { companyName, jobTitle, dateApplied, status } = data;
  const statusNames = new Set(dataFa.map((item) => item.status));
  const statusStyles = statusTags.filter((tag) => statusNames.has(tag.id));

  console.log(statusStyles);
  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <div className="grid [grid-template-columns:80px_2fr_2fr_1fr_1fr] gap-4 p-3 border-b bg-gray-50 font-semibold text-sm">
          {columnNames.map((column, index) => {
            return <p key={index}>{column}</p>;
          })}
        </div>
        {dataFa.map((item, index) => {
          const statusTag = statusStyles.find((tag) => tag.id === item.status);
          return (
            <div
              className="grid [grid-template-columns:80px_2fr_2fr_1fr_1fr] gap-4 py-3 border-b border-gray-100 text-sm px-3 items-center"
              key={index}
            >
              <p className="w-fit">{index}</p>
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
              <p>{item.dateApplied}</p>
              <p className={statusTag?.styles || ""}>{statusTag?.type || item.status}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SummaryTable;
