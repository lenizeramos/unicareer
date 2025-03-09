import { ICardId } from "@/app/Types";
import { jobsCategories } from "@/app/constants";
import CategoryPerks from "./Category&Perk";
import JobCard from "./JobCard";

const Card = ({ cardId }: ICardId) => {
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
          </div>
        );
      case "latestJob":
      case "recentApply":
      case "openPositions":
        return (
          <div className="flex flex-row gap-10 flex-wrap justify-center"></div>
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

export default Card;
