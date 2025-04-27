"use client";
import { ISummaryTable } from "../Types";
import { monthNames, statusTags, stylesTags } from "../constants";
import FileDisplay from "./FileDisplay";
import { useRouter } from "next/navigation";
import TagComp from "./TagComp";
import ButtonComp from "./ButtonComp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SummaryTable = ({
  columnNames,
  data,
  isUserPhoto,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
}: ISummaryTable) => {
  const statusNames = new Set(data.map((item) => item.tags.toLowerCase()));
  const statusStyles = statusTags.filter((tag) => statusNames.has(tag.id));
  const router = useRouter();

  const getDate = (date: string) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = new Date(date);
    const month = monthNames[createDate.getMonth()];
    const year = createDate.getFullYear();
    return `${createDate.getDate()} ${month}, ${year}`;
  };
  const handleOnClick = (id: string | undefined) => {
    if (id) {
      router.push(`/dashboard/candidate/jobs/description?id=${id}`);
    }
  };
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <div className="sm:grid md:[grid-template-columns:30px_2fr_2fr_1fr_1fr] [grid-template-columns:20px_1.5fr_1.5fr_0.7fr_1fr] gap-4 p-3 border-b bg-gray-50 font-semibold text-lg hidden items-center">
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
            (tag) => tag.id === item.tags.toLowerCase()
          );
          return (
            <div
              className="sm:grid md:[grid-template-columns:30px_2fr_2fr_1fr_1fr] sm:[grid-template-columns:20px_1.5fr_1.5fr_0.7fr_1fr] xs:gap-4 gap-10 py-3 sm:border-b border border-gray-100 text-[17px] px-3 items-center flex justify-center font-shafarik"
              key={index}
            >
              <p className="w-fit sm:block hidden">{index + 1}</p>
              <div className="flex gap-2 w-fit items-center relative">
                <FileDisplay
                  modelName={
                    isUserPhoto ? "userProfileImage" : "companyProfileImage"
                  }
                  userId={item.userData.pic || ""}
                  width={50}
                  height={50}
                  fallbackImage={"/img/img.png"}
                />
                <p className="sm:block hidden">{item.userData.name}</p>
              </div>
              <p className="font-shafarik sm:block hidden">{item.jobTitle}</p>
              <p className="font-shafarik sm:block hidden">
                {getDate(item.date)}
              </p>
              <div className="sm:block hidden">
                {isUserPhoto ? (
                  <ButtonComp IsWhite={false} text="See Details" />
                ) : statusTag ? (
                  <TagComp
                    textColor={`${statusTag?.styles} cursor-pointer`}
                    text={statusTag?.type || item.tags}
                    onClick={() => handleOnClick(item.jobId)}
                  />
                ) : (
                  <TagComp
                    textColor={`${
                      stylesTags[Math.floor(Math.random() * 10)]
                    } cursor-pointer`}
                    text={""}
                    onClick={() => handleOnClick(item.jobId)}
                  />
                )}
              </div>
              <div className="sm:hidden">
                <p className="sm:hidden font-semibold">{item.userData.name}</p>
                <p className="font-shafarik">{item.jobTitle}</p>
                <div className="flex xs:flex-row flex-col xs:gap-10 gap-2">
                  <p className="font-shafarik">
                    <span className="font-shafarik text-gray-400 text-[13px]">
                      {isUserPhoto ? "Date Joined" : "Date Applied"}&nbsp;
                    </span>
                    {getDate(item.date)}
                  </p>
                  {isUserPhoto ? (
                    <ButtonComp IsWhite={false} text="See Details" />
                  ) : statusTag ? (
                    <TagComp
                      textColor={`${statusTag?.styles} cursor-pointer`}
                      text={statusTag?.type || item.tags}
                      onClick={() => handleOnClick(item.jobId)}
                    />
                  ) : (
                    <TagComp
                      textColor={`${
                        stylesTags[Math.floor(Math.random() * 10)]
                      } cursor-pointer`}
                      text={""}
                      onClick={() => handleOnClick(item.jobId)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="md:flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 border-t mt-6 rounded-b-lg font-shafarik hidden">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-gray-600 ">View</span>
          <select
            className="rounded px-2 py-1 text-xs sm:text-sm border-light"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <span className="text-gray-600">payments per page</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded disabled:opacity-50"
          >
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SummaryTable;
