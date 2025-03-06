import Image from "next/image";
import ButtonComp from "../components/ButtonComp";
import { styles } from "../styles";
import Logo from "../components/Logo";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  return (
    <>
    <div className="px-5">
      <Image src={"/img/logo.svg"} alt="logo" width={100} height={100}/>
      <h1 className="font-bigShoulderStencil text-5xl">
        Discover more than 500+ Jobs
      </h1>
      <h1 className="font-bigShoulderInline text-5xl">
        Discover more than 500+ Jobs
      </h1>
      <p className="font-shafarik text-xl">Finance</p>
      <p className="font-monomakh text-xl">Finance</p>
      <ButtonComp text="My button" IsWhite={false} />
    </div>

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
