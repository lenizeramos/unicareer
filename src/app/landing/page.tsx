import { styles } from "../styles";
import CardsContainer from "../components/Cards/CardsContainer";
import JobSearchForm from "../components/JobSearchForm"; // Import JobSearchForm

const LandingPage: React.FC = () => {
    const countries = ["USA", "Canada", "UK", "Australia", "India"];

    return (
        <>
            <div className="bg-landingDark  p-10 pl-10 flex flex-col gap-5">
                <div className="bg-landingDark pl-10 max-w-s flex flex-col ">
                    <h1 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                        Discover <br /> more than <br />
                        <span className={`${styles.heroHeadSpan}`}>5000+ Jobs</span>
                    </h1>

                    <p className="description max-w-2xs text-gray-400">
                        Great platform for the job seeker that searching for new career heights and passionate about
                        startups.
                    </p>
                </div>

                {/* <div className="w-190 h-15 "> */}
                <div className="p-10">
                    <JobSearchForm countries={countries} />
                    <p className="description p-2  max-w-s text-gray-400">
                        Popular : UI Designer, UX Researcher, Android, Admin
                    </p>
                </div>

                {/* </div> */}

                {/* Cards Section */}
                <div className="bg-landingDark  p-10 pl-10 flex flex-col gap-5">
                    <div className="flex flex-col gap-10 h-fit">
                        <div>
                            <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                                Explore by
                                <span className={`${styles.heroHeadSpan}`}> category</span>
                            </h2>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-row gap-10 flex-wrap justify-center">
                                    <CardsContainer cardId="category" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                                Featured
                                <span className={`${styles.heroHeadSpan}`}>jobs</span>
                            </h2>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-row gap-10 flex-wrap justify-center">
                                    <CardsContainer cardId="featuredJob" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                                Latest
                                <span className={`${styles.heroHeadSpan}`}>jops open</span>
                            </h2>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-row gap-10 flex-wrap justify-center">
                                    <CardsContainer cardId="latestJob" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
