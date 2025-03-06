import Card from "./components/Cards/Card";
import { styles } from "./styles";
import { MdOutlineDesignServices } from "react-icons/md";

export default function Home() {
  return (
    <>
      <div className={`bg-landingDark p-5 flex flex-col gap-5`}>
        <h1 className={`${styles.heroHeadTextDark} ${styles.titleHeroSize} text-white`}>
          Discover more than 500+ Jobs
        </h1>

        <div className="flex flex-col gap-10">
          <h2 className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}>Cards Section</h2>

          <Card icon={MdOutlineDesignServices} />
        </div>
      </div>
    </>
  );
}
