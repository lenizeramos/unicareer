"use client";
import { styles } from "@/app/styles";
import { ICards } from "@/app/Types";
import Image from "next/image";
import ButtonComp from "../ButtonComp";
import ProgressBar from "../ProgressBar";
import TagComp from "../TagComp";
import { jobsCategories } from "@/app/constants";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { IUserState } from "@/app/Types/slices";
import { useEffect } from "react";
import { fetchUsers } from "@/app/context/slices/usersSlices";

const JobResumeCards = ({
  id,
  logo,
  title,
  categories,
  companyId,
  type,
  cardId,
  location,
}: ICards) => {
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector(
    (state: RootState) => state.users as IUserState
  );
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers("company"));
    }
  });
  const company = users.find((company) => company.userId === companyId);
  return (
    <>
      <div
        className={`${styles.categoryCard} flex md:flex-row flex-col justify-between md:items-center md:gap-10 gap-5`}
      >
        <div className="flex md:flex-row flex-col gap-5 items-center">
          <div>
            <Image
              src={`"/img/logo.svg"`}
              alt={`${company?.name}_logo`}
              width={50}
              height={50}
            />
            {logo}
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
                {Array.isArray(categories) &&
                  categories.map((item, index) => {
                    const stylesTag = jobsCategories.find(
                      (categ) => categ.title === item
                    );
                    return (
                      <TagComp
                        bgColor={`${stylesTag?.bgColor}`}
                        textColor={`${stylesTag?.textColor}`}
                        text={`${stylesTag?.title}`}
                        key={index}
                      />
                    );
                  })}
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
        {cardId === "allJobs" ? (
          <div className="flex flex-col gap-2">
            <Link href={`/dashboard/candidate/jobs/description?id=${id}`}>
              <ButtonComp text="Apply" IsWhite={false} width="w-full" />
            </Link>
            <ProgressBar totalLength={10} value={5} />
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default JobResumeCards;
