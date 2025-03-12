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
              <div className="flex flex-row flex-wrap gap-5 justify-center">
                <p className="text-white">cardId= dashboardCard</p>
                <BasicCards
                  cardId="dashboardCard"
                  icon={LuMessageCircleQuestion}
                  subicons={BiMessageRoundedDetail}
                />
              </div>
            ) : cardId === "category" ? (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <p className="text-white">cardId= category</p>
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
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <p className="text-white">cardId= perks</p>
                <BasicCards cardId="perks" />
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
                <p className="text-white">cardId= featuredJob</p>
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
                <JobCard cardId={cardId} />
              </div>
            ) : (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <p className="text-white">cardId= jobUpdates</p>
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
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <p className="text-white">cardId= latestJob</p>
                <JobResumeCards cardId={cardId} />
                <JobResumeCards cardId={cardId} />
              </div>
            ) : cardId === "openPositions" ? (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <p className="text-white">cardId= openPositions</p>
                <JobResumeCards cardId={cardId} />
                <JobResumeCards cardId={cardId} />
              </div>
            ) : (
              <div className="flex flex-row gap-10 flex-wrap justify-center">
                <p className="text-white">cardId= allJobs</p>
                <JobResumeCards cardId={cardId} />
                <JobResumeCards cardId={cardId} />
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
                <p className="text-white">cardId= recentPosted</p>
                <RecentCard cardId={cardId} />
                <RecentCard cardId={cardId} />
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <p className="text-white">cardId= recentApply</p>
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
