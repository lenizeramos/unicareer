"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import DashboardNavbar from "../../../../../components/DashboardNavbar";
import ButtonComp from "@/app/components/ButtonComp";
import { styles } from "@/app/styles";
import { jobPosted } from "@/app/constants";
import { CiCircleCheck } from "react-icons/ci";
import CardsContainer from "@/app/components/Cards/CardsContainer";

export default function JobDescription() {
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const job = jobPosted.find((item) => item.id === id);

  if (!job) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }
  return (
    <>
      <DashboardNavbar
        title="Job Description"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="flex flex-col gap-10 mx-5">
        <div className="border-t-[1px] border-gray-200 py-5">
          <div className="bg-[#f8f8fd] xs:p-10 p-5">
            <div className="flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start bg-white p-5 border border-gray-200 gap-5 md:gap-0 ">
              <div className="flex md:flex-row flex-col gap-5 md:items-center items-start">
                <Image
                  src={`/img/logo.svg`}
                  alt="logo"
                  width={80}
                  height={80}
                />
                <div>
                  <h1 className={`${styles.sectionHeadText} pb-2`}>{job.title}</h1>
                  <p
                    className={`flex items-center gap-2 ${styles.sectionSubText} xs:text-lg text-sm`}
                  >
                    {job.company}
                    <span className="bg-gray-600 rounded-full w-1 h-1" />
                    {job.place}
                    <span className="bg-gray-600 rounded-full w-1 h-1" />
                    {job.type}
                  </p>
                </div>
              </div>
              <div className="md:pl-10 md:border-l-[1px] border-gray-200 md:w-[8rem] w-full">
                <ButtonComp text="Apply" IsWhite={false} width="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-5">
            <div className="">
              <h2 className={`${styles.JobDescriptionTitle}`}>Description</h2>
              <p className={`${styles.JobDescriptionText}`}>
                {job.description}
              </p>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>
                Responsibilities
              </h2>
              <ul>
                {job.responsibilities.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${styles.JobDescriptionText} ${styles.lists}`}
                    >
                      <CiCircleCheck color="green" size={20} /> {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>Who You Are</h2>
              <ul>
                {job.whoYouAre.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${styles.JobDescriptionText} ${styles.lists}`}
                    >
                      <CiCircleCheck color="green" size={20} /> {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>Nice To Have</h2>
              <ul>
                {job.plus.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${styles.JobDescriptionText} ${styles.lists}`}
                    >
                      <CiCircleCheck color="green" size={20} /> {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div></div>
        </div>
        <div className="border-t-[1px] border-gray-200 pt-4">
          <h2 className={`${styles.JobDescriptionTitle} text-4xl`}>
            Perks & Benefits
          </h2>
          <p className={`${styles.JobDescriptionText}`}>
            This job comes with several perks and benefits
          </p>
          <div className="mt-4">
            <CardsContainer cardId="perks" />
          </div>
        </div>
      </div>
    </>
  );
}
