import { ICardId } from "@/app/Types";
import { jobPosted, jobsCategories, perksData } from "@/app/constants";
import BasicCards from "./BasicCards";
import JobCard from "./JobCard";
import JobResumeCards from "./JobResumeCards";
import RecentCard from "./RecentCard";
import { AppDispatch, RootState } from "@/app/context/store";
import { useDispatch, useSelector } from "react-redux";
import { IDataState } from "@/app/Types/slices";
import { useEffect } from "react";
import { fetchAllJobs } from "@/app/context/slices/jobSlices";

const CardsContainer = ({ cardId, params }: ICardId) => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.jobs as IDataState);
  console.log(data)
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [dispatch, data.length]);
  const renderCard = () => {
    switch (cardId) {
      case "category":
      case "perks":
      case "dashboardCard":
        return (
          <>
            {cardId === "dashboardCard" ? (
              <div className="flex flex-row flex-wrap gap-5 justify-center">
                <BasicCards
                  cardId="dashboardCard"
                  icon={params?.[0].icon}
                  subicons={params?.[0].subicons}
                  title={params?.[0].title}
                  total={params?.[0].total}
                />
              </div>
            ) : cardId === "category" ? (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                {jobsCategories.map((data, index) => {
                  return (
                    <div className="" key={index}>
                      <BasicCards
                        {...data}
                        cardId="category"
                        text="2 jobs available"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 pointer-events-none">
                {perksData.map((item, index) => {
                  return <BasicCards cardId="perks" {...item} key={index} />;
                })}
              </div>
            )}
          </>
        );
      case "featuredJob":
      case "jobUpdates":
        return (
          <>
            {cardId === "featuredJob" ? (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
              </div>
            ) : (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
              </div>
            )}
          </>
        );
      case "latestJob":
      case "openPositions":
      case "allJobs":
        return (
          <>
            {cardId === "latestJob" ? (
              <div className="flex flex-row gap-5 flex-wrap justify-center">
                <JobResumeCards cardId={cardId} />
                <JobResumeCards cardId={cardId} />
              </div>
            ) : cardId === "openPositions" ? (
              <div className="flex flex-col gap-3 w-fit mx-auto">
                <JobResumeCards cardId={cardId} />
                <JobResumeCards cardId={cardId} />
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full mx-auto">
                {data.map((info, index) => {
                  return (
                    <JobResumeCards cardId={cardId} {...info} key={index} />
                  );
                })}
              </div>
            )}
          </>
        );
      case "recentPosted":
      case "recentApply":
        return (
          <>
            {cardId === "recentPosted" ? (
              <div className="flex flex-col gap-4 w-full">
                <RecentCard
                  cardId={cardId}
                  title={params?.[0].title}
                  date={params?.[0].date}
                  company={params?.[0].company}
                  text={params?.[0].text}
                />
                <RecentCard
                  cardId={cardId}
                  title={params?.[1].title}
                  date={params?.[1].date}
                  company={params?.[1].company}
                  text={params?.[1].text}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <RecentCard cardId={cardId} />
                <RecentCard cardId={cardId} />
              </div>
            )}
          </>
        );
      default:
        break;
    }
  };
  return (
    <>
      <div>{renderCard()}</div>
    </>
  );
};

export default CardsContainer;
