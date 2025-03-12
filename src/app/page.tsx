import CardsContainer from "./components/Cards/CardsContainer";
import { styles } from "./styles";

export default function Home() {
  return (
    <>
      <div className={`bg-landingDark p-5 flex flex-col gap-5`}>
        <h1
          className={`${styles.heroHeadTextDark} ${styles.titleHeroSize} text-white`}
        >
          Discover more than 500+ Jobs
        </h1>

        <div className="flex flex-col gap-10 h-fit">
          <h2
            className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
          >
            Cards Section
          </h2>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-10 flex-wrap justify-center">
              <CardsContainer cardId="category" />;
            </div>
            <CardsContainer cardId="jobUpdates" />
            <CardsContainer cardId="latestJob" />
            <CardsContainer cardId="recentApply" />
          </div>
          <div>
            <CardsContainer cardId="dashboardCard"/>
          </div>
        </div>
      </div>
    </>
  );
}
