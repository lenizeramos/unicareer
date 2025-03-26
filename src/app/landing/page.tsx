import { styles } from "../styles";
import CardsContainer from "../components/Cards/CardsContainer";
import JobSearchForm from "../components/JobSearchForm";
import { SiVodafone } from "react-icons/si";
import { SiIntel } from "react-icons/si";
import ButtonComp from "../components/ButtonComp";
const LandingPage: React.FC = () => {
    const countries = ["USA", "Canada", "UK", "Australia", "India"];

    return (
        <>
            <div className="bg-landingDark  p-15 pl-10 flex flex-col gap-5">
                <h1 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                    Discover <br /> more than <br />
                    <span className={`${styles.heroHeadSpan}`}>5000+ Jobs</span>
                </h1>

                <p className={`${styles.heroSubText} description max-w-110 text-gray-400`}>
                    Great platform for the job seeker that searching for new career heights and passionate about
                    startups.
                </p>

                <JobSearchForm countries={countries} />
                <p className={`${styles.heroSubText} description p-2  max-w-s text-gray-400`}>
                    Popular : UI Designer, UX Researcher, Android, Admin
                </p>

                <p className={`${styles.heroSubText} description max-w-full sm:max-w-2xl text-gray-400`}>
                    Companies we helped grow
                </p>
                <div
                    className={`${styles.iconsCards} ${styles.heroSubText} text-gray-500 p-3 flex flex-wrap justify-start gap-6 sm:gap-10`}
                >
                    <p className="flex items-center">
                        <SiVodafone className="mr-2" />
                        <span>vodafone</span>
                    </p>
                    <p className={`${styles.heroSubText} text-4xl`}>
                        <SiIntel />
                    </p>
                    <p className={`${styles.sectionHeadText} text-3xl`}>TESLA</p>
                    <p className={`${styles.sectionHeadText} text-3xl`}>AMDA</p>
                    <p className={`${styles.sectionHeadText} text-3xl`}>Talkit</p>
                </div>

                {/* Cards Section */}

                <div className=" flex flex-col gap-10 h-fit">
                    <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                        Explore by
                        <span className={`${styles.heroHeadSpan}`}> category</span>
                    </h2>
                    <div className=" flex flex-col gap-10">
                        <div className="flex flex-row gap-10 flex-wrap justify-center">
                            <CardsContainer cardId="category" />
                        </div>

                        <div className="p-8 sm:p-8 md:p-10 max-w-full sm:max-w-md lg:max-w-lg flex flex-col bg-primary w-500 sm:w-3/4 lg:w-1/2 h-auto">
                            <h1
                                className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white text-2xl sm:text-3xl lg:text-4xl w-full`}
                            >
                                Start posting jobs today
                            </h1>
                            <p className={`${styles.sectionHeadText} p-2 text-white text-sm sm:text-base lg:text-lg`}>
                                Start posting jobs for only $10.
                            </p>

                            <ButtonComp text="Sign Up For Free" IsWhite={true} />
                        </div>

                        <div className="p-8">
                            <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                                Featured
                                <span className={`${styles.heroHeadSpan}`}> jobs</span>
                            </h2>
                            <div className="p-5 flex flex-col gap-10">
                                <div className="flex flex-row gap-10 flex-wrap justify-center">
                                    <CardsContainer cardId="featuredJob" />
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>
                                Latest
                                <span className={`${styles.heroHeadSpan}`}> jops open</span>
                            </h2>
                            <div className="p-5 flex flex-col gap-10">
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
