"use client";
import { styles } from "@/app/styles";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import JobSearchForm from "@/app/components/JobSearchForm";
import ButtonComp from "@/app/components/ButtonComp";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../context/store";
import { useDispatch, useSelector } from "react-redux";
import { Ijobs, IJobsState } from "../Types/slices";
import { fetchAllJobs } from "../context/slices/jobSlices";
import SearchNotFound from "../components/SearchNotFound";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.jobs as IJobsState);
  const [filters, setFilters] = useState({
    searchTerm: "",
    searchLocation: "",
  });
  const router = useRouter();
  const { user } = useClerk();
  const userRole = user?.publicMetadata?.role as string;
/* const [jobs, setJobs] = useState<Ijobs[]>([]) */


  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [jobs.length, dispatch]);

  /* useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const params = new URLSearchParams({
          take: (6).toString(),
        });

        const response = await fetch(
          `/api/job/get-recent?${params.toString()}`
        );
        if (!response.ok) throw new Error("Failed to fetch recent jobs");
        const { jobs } = await response.json();

        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching recent jobs:", error);
        throw error;
      }
    };
    fetchRecentJobs();
  }, []); */

  const jobsWithStatus = jobs.filter(
    (job) => new Date(job.closingDate) > new Date()
  );
  const hasFilters = filters.searchTerm !== "" || filters.searchLocation !== "";

  const filtersJobs = jobsWithStatus.filter((job) => {
    const matchesTitle = job.location
      .toLowerCase()
      .includes(filters.searchLocation.toLowerCase());
    const matchesLocation = job.title
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());

    return matchesTitle && matchesLocation;
  });
  const handleFilterChange = (
    key: string,
    value: string | { min: number; max: number }
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };
  const data = filtersJobs.map((job) => {
    return {
      logo: job.company?.userId ?? "/img/img.png",
      companyname: job.company?.name ?? "Unknown Company",
      date: job.createdAt,
      location: job.location,
      type: job.type,
      title: job.title,
      categories: job.categories,
      text: job.description,
    };
  });

  const getFrequencies = (arr: Ijobs[], key: keyof Ijobs) => {
    const freq: Record<string, number> = {};

    arr.forEach((item) => {
      const value = item[key];
      if (typeof value === "string") {
        freq[value] = (freq[value] || 0) + 1;
      }
    });

    return freq;
  };
  const freqArray = Object.entries(getFrequencies(jobs, "categories")).map(
    ([category, value]) => ({
      category,
      value,
    })
  );
  const handleOnClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      if (userRole === "company") {
        router.push(`/dashboard/${userRole}`);
      } else {
        toast(
          <div className="flex items-center gap-3">
            <FaExclamationTriangle size={28} className="text-yellow-400" />
            <p className="text-[18px] text-gray-300 font-shafarik">
              To continue, please sign-in as a company.
            </p>
          </div>,
          {
            style: {
              background: "#202430",
              borderRadius: "8px",
              padding: "16px",
            },
            duration: 3000,
            position: "top-center",
          }
        );
      }
    }
  };
  const handleOnClickCard = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      if (userRole === "candidate") {
        router.push(`/dashboard/${userRole}/jobs`);
      } else {
        toast(
          <div className="flex items-center gap-3">
            <FaExclamationTriangle size={28} className="text-yellow-400" />
            <p className="text-[18px] text-gray-300 font-shafarik">
              To continue, please sign-in as a candidate.
            </p>
          </div>,
          {
            style: {
              background: "#202430",
              borderRadius: "8px",
              padding: "16px",
            },
            duration: 3000,
            position: "top-center",
          }
        );
      }
    }
  };
  return (
    <>
      <div className="bg-landingDark flex flex-col gap-5">
        <div className="md:p-15 p-10 flex flex-col gap-7">
          <h1
            className={`${styles.heroHeadTextDark} md:text-[6rem] sm:text-[5rem] xs:text-[4rem] text-[3rem] flex flex-col`}
          >
            Discover more than
            <span className={`${styles.heroHeadSpan}`}>5000+ Jobs</span>
          </h1>
          <p
            className={`${styles.heroSubText}  text-gray-400 md:text-2xl sm:text-xl xs:text-base text-sm text-justify`}
          >
            Great platform for the job seeker that searching for{" "}
            <br className="sm:block hidden" /> new career heights and passionate
            about startups.
          </p>
          <JobSearchForm onFilterChange={handleFilterChange} />
          {hasFilters ? (
            filtersJobs.length === 0 ? (
              <SearchNotFound text="No matching jobs found." />
            ) : (
              <CardsContainer
                params={data}
                cardId="recentPosted"
                styles="grid grid-cols-1 sm:grid-cols-2 gap-5"
              />
            )
          ) : (
            <div />
          )}
        </div>

        <div className="md:p-15 p-10 flex flex-col gap-10 bg-blue-950">
          <h2
            className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
          >
            Explore by
            <span className={`text-[#26a4ff]`}> Category</span>
          </h2>
          <div className="flex flex-row gap-10 flex-wrap justify-center">
            <CardsContainer
              cardId="category"
              frequencies={freqArray}
              onClick={() => handleOnClickCard()}
            />
          </div>
        </div>

        <div className="md:p-15 p-10 flex flex-col gap-5">
          <h2
            className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
          >
            Featured
            <span className={`${styles.heroHeadSpan}`}> jobs</span>
          </h2>
          <CardsContainer cardId="featuredJob" params={data} />
        </div>

        <div className="md:p-15 p-10 w-full flex flex-col lg:flex-row bg-blue-950 justify-between">
          <div className="flex flex-col p-6 gap-5">
            <h2
              className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
            >
              Start <span className={`text-[#26a4ff]`}> posting</span> jobs
              today
            </h2>
            <p
              className={`${styles.sectionHeadText} p-2 text-white text-sm sm:text-base lg:text-lg`}
            >
              Start posting jobs for only{" "}
              <span className={`text-[#26a4ff]`}> $10.</span>
            </p>
            <ButtonComp
              text="Sign Up For Free"
              IsWhite={true}
              onClick={handleOnClick}
            />
          </div>
          <div className="w-full h-65 sm:h-110 relative">
            <Image
              src="/img/CompanyDashboard.jpg"
              alt="CompanyDashboard"
              layout="fill"
              objectFit="cover"
              objectPosition="left top"
            />
          </div>
        </div>
      </div>
    </>
  );
}
