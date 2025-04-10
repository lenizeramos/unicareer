"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DashboardNavbar from "../../../../../components/DashboardNavbar";
import ButtonComp from "@/app/components/ButtonComp";
import { styles } from "@/app/styles";
import { jobsCategories, monthNames, stylesTags } from "@/app/constants";
import { CiCircleCheck } from "react-icons/ci";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import ProgressBar from "@/app/components/ProgressBar";
import TagComp from "@/app/components/TagComp";
import { AppDispatch, RootState } from "@/app/context/store";
import { useDispatch, useSelector } from "react-redux";
import {
  IApplicantsState,
  IJobsState,
  IUserState,
} from "@/app/Types/slices";
import { useEffect } from "react";
import { fetchAllJobs } from "@/app/context/slices/jobSlices";
import { fetchUsers } from "@/app/context/slices/usersSlices";
import { useRouter } from "next/navigation";
import { useCandidateData } from "@/Lib/client/candidate";
import { fetchApplicants } from "@/app/context/slices/applicantsSlices";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";

export default function JobDescription() {
  const router = useRouter();
  const { candidate, isLoading } = useCandidateData();

  const dispatch: AppDispatch = useDispatch();
  const { jobs, loading } = useSelector(
    (state: RootState) => state.jobs as IJobsState
  );
  const { users } = useSelector(
    (state: RootState) => state.users as IUserState
  );
  const { applicants } = useSelector(
    (state: RootState) => state.applicants as IApplicantsState
  );
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const job = jobs.find((item) => item.id === id);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [jobs.length]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers("company"));
    }
  }, [users.length]);

  useEffect(() => {
    if (applicants.length === 0) {
      dispatch(fetchApplicants());
    }
  }, [applicants.length]);

  const company = users.find((company) => company.id === job?.companyId);
  if (loading) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!job) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }
  if (!candidate) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }
  const getDate = (date: string) => {
    const createDate = new Date(date);
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDay()} , ${createDate.getFullYear()} `;
  };
  const category =
    typeof job.categories === "string" ? job.categories.toLowerCase() : "";

  const application = candidate.applications.some(
    (item) => item.jobId === job.id
  );

  console.log("job=>", job, "candidate=>", application);
  const handleApplicationSubmit = async () => {
    if (!candidate) {
      console.error("No candidate ID available");
      return;
    }
    try {
      const response = await fetch("/api/apply-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          candidateId: candidate.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Application error: ${response.statusText}`);
      }
      toast.success("You've successfully applied to the job!", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#6f66ff4a",
          fontFamily: "fantasy",
          fontSize: "1rem",
          borderRadius: "8px",
          letterSpacing: "0.5px",
        },
      });
      setTimeout(() => {
        router.push("/dashboard/candidate/jobs");
      }, 2500);
    } catch (error) {
      console.error("Error submitting your application:", error);
    }
  };

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
                  <h1 className={`${styles.sectionHeadText} pb-2`}>
                    {job.title}
                  </h1>
                  <p
                    className={`flex items-center gap-2 ${styles.sectionSubText} xs:text-lg text-sm`}
                  >
                    {company?.name}
                    <span className="bg-gray-600 rounded-full w-1 h-1" />
                    {job.location}
                    <span className="bg-gray-600 rounded-full w-1 h-1" />
                    {job.type}
                  </p>
                </div>
              </div>
              <div className="md:pl-10 md:border-l-[1px] border-gray-200 md:w-[8rem] w-full">
                {application ? (
                  <ButtonComp
                    text="Apply"
                    IsWhite={false}
                    width="w-full"
                    isDissable={true}
                  />
                ) : (
                  <ButtonComp
                    text="Apply"
                    IsWhite={false}
                    width="w-full"
                    onClick={handleApplicationSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-20 lg:flex-row flex-col">
          <div className="flex flex-col gap-5 lg:w-[70%]">
            <div className="">
              <h2 className={`${styles.JobDescriptionTitle}`}>Description</h2>
              <p className={`${styles.JobDescriptionText} text-justify`}>
                {job.description}
              </p>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>
                Responsibilities
              </h2>
              <p className={`${styles.JobDescriptionText}`}>
                {job.responsibilities}
              </p>
              {/* <ul>
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
              </ul> */}
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>Who You Are</h2>
              {/* <ul>
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
              </ul> */}
              <p className={`${styles.JobDescriptionText}`}>{job.whoYouAre}</p>
            </div>
            <div>
              <h2 className={`${styles.JobDescriptionTitle}`}>Nice To Have</h2>
              {/* <ul>
                {job.niceToHave.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${styles.JobDescriptionText} ${styles.lists}`}
                    >
                      <CiCircleCheck color="green" size={20} /> {item}
                    </li>
                  );
                })}
              </ul> */}
              <p className={`${styles.JobDescriptionText}`}>{job.niceToHave}</p>
            </div>
          </div>
          <div className=" 2xl:w-[20%] xl:w-[30%] lg:w-[45%] flex lg:flex-col xs:flex-row flex-col justify-around">
            <div className="flex flex-col gap-4 ">
              <h2 className={`${styles.JobDescriptionTitle}`}>
                About this role
              </h2>
              <div className="bg-gray-100  w-[80%] p-5 lg:mx-auto xs:mx-0 mx-auto">
                <ProgressBar value={5} totalLength={10} />
              </div>
              <div className="flex justify-between">
                <p className={`${styles.JobDescriptionText}`}>Apply Before</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {getDate(job.closingDate)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className={`${styles.JobDescriptionText}`}>Job Posted On</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {getDate(job.createdAt)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className={`${styles.JobDescriptionText}`}>Job Type</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {job.type}
                </p>
              </div>
              <div className="flex justify-between">
                <p className={`${styles.JobDescriptionText}`}>Salary</p>
                <p className={`${styles.JobDescriptionText} font-bold`}>
                  {job.salaryMin} - {job.salaryMax} CAD/hour
                </p>
              </div>
            </div>
            <div className="lg:hidden w-0.5  bg-gray-200" />
            <div className="lg:border-y-[1px] border-gray-200 py-15">
              <h2 className={`${styles.JobDescriptionTitle}`}>Categories</h2>
              <div className="flex gap-2">
                {Array.isArray(job.categories) ? (
                  job.categories.map((item, index) => {
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
                  })
                ) : (
                  <TagComp
                    bgColor={`${
                      jobsCategories.find(
                        (style) => style.title.toLowerCase() === category
                      )?.bgColor
                    }`}
                    textColor={`${
                      jobsCategories.find(
                        (style) => style.title.toLowerCase() === category
                      )?.textColor
                    }`}
                    text={`${
                      jobsCategories.find(
                        (style) => style.title.toLowerCase() === category
                      )?.title
                    }`}
                  />
                )}
              </div>
            </div>
            <div className="py-10">
              <h2 className={`${styles.JobDescriptionTitle}`}>
                Required Skills
              </h2>
              <div className="flex gap-5 flex-wrap">
                {Array.isArray(job.skills) ? (
                  job.skills.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.sectionSubText} p-2 w-fit rounded-full mb-2 ${stylesTags[index]}`}
                      >
                        {item}
                      </div>
                    );
                  })
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
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
