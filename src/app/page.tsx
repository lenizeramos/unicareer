import ButtonComp from "./components/ButtonComp";
import Logo from "./components/Logo";
import { styles } from "./styles";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="bg-landingDark p-5 flex flex-col gap-5">
        <Logo fontSize="text-4xl" logoSize={50} />
        <ButtonComp text="My button" IsWhite={true} />
        <h1 className={`${styles.heroHeadText} ${styles.titleHeroSize}`}>
          Hey <span className={`${styles.heroHeadSpan}`}>There</span>
        </h1>
        <FaRegEdit size={100} className="text-red-300 hover:text-amber-200" />
      </div>
    </>
  );
}
