import { ICardId } from "@/app/Types";
import { jobsCategories } from "@/app/constants";
import CategoryPerks from "./Category&Perk";
import JobCard from "./JobCard";
import JobResumeCards from "./JobResumeCards";
import RecentCard from "./RecentCard";

const CardsContainer = ({ cardId }: ICardId) => {
  const renderCard = () => {
    switch (cardId) {
      case "category":
      case "perks":
        return (
          <div className="flex flex-row gap-10 flex-wrap justify-center">
            {jobsCategories.map((data, index) => {
              return (
                <div className="" key={index}>
                  <CategoryPerks {...data} cardId="category" />
                </div>
              );
            })}
          </div>
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
