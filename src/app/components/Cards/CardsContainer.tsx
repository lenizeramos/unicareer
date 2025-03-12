import { ICardId } from "@/app/Types";
import { jobsCategories } from "@/app/constants";
import BasicCards from "./BasicCards";
import JobCard from "./JobCard";
import JobResumeCards from "./JobResumeCards";
import RecentCard from "./RecentCard";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { BiMessageRoundedDetail } from "react-icons/bi";

const CardsContainer = ({ cardId }: ICardId) => {
  const renderCard = () => {
    switch (cardId) {
      case "category":
      case "perks":
      case "dashboardCard":
        return (
          <>
            {cardId === "dashboardCard" ? (
              <div className="flex flex-col w-fit gap-5">
                <BasicCards
                  cardId="dashboardCard"
                  icon={LuMessageCircleQuestion}
                  subicons={BiMessageRoundedDetail}
                />
                <BasicCards cardId="dashboardCard" />
              </div>
            ) : (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                {jobsCategories.map((data, index) => {
                  return (
                    <div className="" key={index}>
                      <BasicCards {...data} cardId="category" />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
      case "featuredJob":
      case "jobUpdates":
        return (
          <div className="flex flex-row gap-10 flex-wrap justify-center">
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
            <JobCard cardId={cardId} />
          </div>
        );
      case "latestJob":
      case "openPositions":
      case "allJobs":
        return (
          <div className="flex flex-row gap-10 flex-wrap justify-center">
            <JobResumeCards cardId={cardId} />
            <JobResumeCards cardId={cardId} />
            <JobResumeCards cardId={cardId} />
            <JobResumeCards cardId={cardId} />
            <JobResumeCards cardId={cardId} />
            <JobResumeCards cardId={cardId} />
          </div>
        );
      case "recentPosted":
      case "recentApply":
        return (
          <div className="flex flex-col gap-4 w-full">
            <RecentCard cardId={cardId} />
            <RecentCard cardId={cardId} />
          </div>
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
