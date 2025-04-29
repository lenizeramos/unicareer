"use client";
import { styles } from "@/app/styles";
import { ICards } from "@/app/Types";
import ButtonComp from "../ButtonComp";
import TagComp from "../TagComp";
import { jobsCategories } from "@/app/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { IUserState } from "@/app/Types/slices";
import { useEffect } from "react";
import { fetchUsers } from "@/app/context/slices/usersSlices";
import { useRouter } from "next/navigation";
import FileDisplay from "../FileDisplay";

const JobResumeCards = ({
  id,
  title,
  categories,
  companyId,
  type,
  cardId,
  location,
  styleCard,
  hasApplied = false,
}: ICards) => {
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector(
    (state: RootState) => state.users as IUserState
  );
  const router = useRouter();
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers("company"));
    }
  }, [dispatch, users.length]);
  const company = users.find((company) => company.id === companyId);
  const handleSeeDetails = async () => {
    try {
      const response = await fetch(`/api/job/${id}/view/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to record view");
      }
      router.push(`/dashboard/candidate/jobs/description?id=${id}`);
    } catch (error) {
      console.error("Error recording view:", error);
    }
  };

  return (
    <>
      <div
        className={`${styles.categoryCard} bg-white flex md:flex-row flex-col justify-between md:items-center md:gap-10 gap-5`}
      >
        <div
          className={`flex md:flex-row flex-col gap-5 items-center ${styleCard}`}
        >
          <div>
            <FileDisplay
              modelName="companyProfileImage"
              userId={company?.userId || ""}
              width={100}
              height={100}
              fallbackImage={"/img/img.png"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className={`${styles.sectionHeadText} text-black`}>
                {title}
              </h3>
              <h4
                className={`${styles.sectionSubText} text-gray-600 flex items-center gap-2`}
              >
                {company?.name}
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                {location}
              </h4>
            </div>
            <div className="flex gap-3">
              <TagComp
                bgColor="bg-[#cbfbf1]"
                textColor="text-[#009c8f]"
                text={`${type}`}
              />
              <div className="w-[1px] bg-gray-300 rounded-full" />
              <div className="flex gap-2">
                {typeof categories === "string" && (
                  <TagComp
                    bgColor={`${
                      jobsCategories.find(
                        (style) =>
                          style.title.toLowerCase() === categories.toLowerCase()
                      )?.bgColor
                    }`}
                    textColor={`${
                      jobsCategories.find(
                        (style) =>
                          style.title.toLowerCase() === categories.toLowerCase()
                      )?.textColor
                    }`}
                    text={`${
                      jobsCategories.find(
                        (style) =>
                          style.title.toLowerCase() === categories.toLowerCase()
                      )?.title
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {cardId === "allJobs" && (
          <div className="flex flex-col gap-2">
            {!hasApplied ? (
              <ButtonComp
                text="See Details"
                IsWhite={false}
                width="w-full"
                onClick={handleSeeDetails}
              />
            ) : (
              <ButtonComp
                text="Applied"
                IsWhite={false}
                width="w-full"
                onClick={handleSeeDetails}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default JobResumeCards;
