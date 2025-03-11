import ButtonComp from "./components/ButtonComp";
import Logo from "./components/Logo";
import { styles } from "./styles";
import { FaRegEdit } from "react-icons/fa";
import CompanyProfile from "./components/CompanyProfile";

export default function Home() {
  return (
    <>
      <div className="bg-landingDark p-5 flex flex-col gap-5">
        <CompanyProfile />
      </div>
    </>
  );
}
