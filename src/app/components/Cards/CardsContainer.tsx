import { ICardId } from "@/app/Types";
import { jobsCategories, perksData } from "@/app/constants";
import BasicCards from "./BasicCards";
import JobCard from "./JobCard";
import JobResumeCards from "./JobResumeCards";
import RecentCard from "./RecentCard";

const CardsContainer = ({
  cardId,
  params,
  styles,
  frequencies,
  onClick,
}: ICardId) => {
  const jobsByCategory = jobsCategories.map((category) => {
    const match = frequencies?.find(
      (item) => item.category.toLowerCase() === category.title.toLowerCase()
    );

    return {
      ...category,
      text: match ? match.value : 0,
    };
  });

  const renderCard = () => {
    switch (cardId) {
      case "dashboardCard":
        return (
          <div
            className={`${
              styles
                ? `${styles}`
                : `flex flex-row flex-wrap gap-5 justify-center`
            }`}
          >
            {params?.map((param, index) => (
              <BasicCards
                key={`dashboard-${index}`}
                cardId={cardId}
                {...param}
              />
            ))}
          </div>
        );

      case "category":
        return (
          <div
            className={`${
              styles
                ? `${styles}`
                : `flex flex-row sm:gap-10 gap-5 flex-wrap justify-center`
            }`}
          >
            {jobsByCategory.map((data, index) => (
              <div key={`category-${index}`} onClick={onClick}>
                <BasicCards {...data} cardId="category" />
              </div>
            ))}
          </div>
        );

      case "perks":
        return (
          <div
            className={`${
              styles
                ? `${styles}`
                : `grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 pointer-events-none`
            }`}
          >
            {perksData.map((item, index) => (
              <BasicCards cardId="perks" {...item} key={`perks-${index}`} />
            ))}
          </div>
        );

      case "featuredJob":
        return (
          <div
            className={`${
              styles
                ? `${styles}`
                : `flex flex-row gap-10 flex-wrap justify-center`
            }`}
          >
            {params?.map((param, index) => (
              <JobCard cardId={cardId} key={`featured-${index}`} {...param} />
            ))}
          </div>
        );

      case "jobUpdates":
        return (
          <div
            className={`${
              styles
                ? `${styles}`
                : `flex flex-row gap-10 flex-wrap justify-center`
            }`}
          >
            {params?.map((param, index) => (
              <JobCard key={`job-${index}`} cardId={cardId} {...param} />
            ))}
          </div>
        );

      case "latestJob":
        return (
          <div
            className={`${
              styles
                ? `${styles}`
                : `flex flex-row gap-5 flex-wrap justify-center`
            }`}
          >
            {params?.map((param, index) => (
              <JobResumeCards
                cardId={cardId}
                key={`latest-${index}`}
                {...param}
              />
            ))}
          </div>
        );

      case "openPositions":
        return (
          <div
            className={`${
              styles ? `${styles}` : `flex flex-col gap-3 w-fit mx-auto`
            }`}
          >
            {params?.map((param, index) => (
              <JobResumeCards
                cardId={cardId}
                key={`open-${index}`}
                {...param}
              />
            ))}
          </div>
        );

      case "allJobs":
        return (
          <div
            className={`${
              styles ? `${styles}` : `flex flex-col gap-3 w-full mx-auto`
            }`}
          >
            {params?.map((info, index) => (
              <JobResumeCards
                cardId={cardId}
                {...info}
                key={`alljobs-${index}`}
              />
            ))}
          </div>
        );

      case "recentPosted":
        return (
          <div
            className={`${styles ? `${styles}` : `flex flex-col gap-4 w-full`}`}
          >
            {params?.map((param, index) => (
              <RecentCard
                key={`recent-post-${index}`}
                cardId={cardId}
                {...param}
              />
            ))}
          </div>
        );

      case "recentApply":
        return (
          <div
            className={`${styles ? `${styles}` : `flex flex-col gap-4 w-full`}`}
          >
            {params?.map((param, index) => (
              <RecentCard
                cardId={cardId}
                key={`recent-apply-${index}`}
                {...param}
              />
            ))}
          </div>
        );

      default:
        console.warn(`Unknown cardId: ${cardId}`);
        return null;
    }
  };
  return (
    <>
      <div>{renderCard()}</div>
    </>
  );
};

export default CardsContainer;
