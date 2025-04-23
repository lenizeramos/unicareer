import { ISummaryTable } from "../Types";
import { monthNames, statusTags } from "../constants";
import FileDisplay from "./FileDisplay";

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
        <div className="sm:grid md:[grid-template-columns:80px_2fr_2fr_1fr_1fr] [grid-template-columns:50px_1fr_1.5fr_0.7fr_1fr] gap-4 p-3 border-b bg-gray-50 font-semibold text-sm hidden">
          {columnNames.map((column, index) => {
            return (
              <p key={index} className="font-shafarik">
                {column}
              </p>
            );
          })}
        </div>
        {data.map((item, index) => {
          const statusTag = statusStyles.find(
            (tag) => tag.id === item.status.toLowerCase()
          );
          return (
            <div
              className="sm:grid md:[grid-template-columns:80px_2fr_2fr_1fr_1fr] sm:[grid-template-columns:50px_1fr_1.5fr_0.7fr_1fr] xs:gap-4 gap-10 py-3 sm:border-b border border-gray-100 text-sm px-3 items-center flex justify-center"
              key={index}
            >
              <p className="w-fit sm:block hidden">{index + 1}</p>
              <div className="flex gap-2 w-fit items-center relative">
                <FileDisplay
                  modelName="companyProfileImage"
                  userId={item.companyName.logo || ""}
                  width={50}
                  height={50}
                  fallbackImage={"/img/img.png" || ""}
                />
                <p className="sm:block hidden font-shafarik">
                  {item.companyName.name}
                </p>
              </div>
              <p className="font-shafarik sm:block hidden">{item.jobTitle}</p>
              <p className="font-shafarik sm:block hidden">
                {getDate(item.dateApplied)}
              </p>
              <p className={`${statusTag?.styles || ""} sm:block hidden`}>
                {statusTag?.type || item.status}
              </p>
              <div className="sm:hidden">
                <p className="sm:hidden font-shafarik font-semibold">
                  {item.companyName.name}
                </p>
                <p className="font-shafarik">{item.jobTitle}</p>
                <div className="flex xs:flex-row flex-col gap-2">
                  <p className="font-shafarik">
                    <span className="font-shafarik text-gray-400 text-[13px]">
                      Date Applied&nbsp;
                    </span>
                    {getDate(item.dateApplied)}
                  </p>

                  <p className={statusTag?.styles || ""}>
                    {statusTag?.type || item.status}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SummaryTable;
