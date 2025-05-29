import { IDashboardNavbar } from "../Types";
import { MdArrowBackIosNew } from "react-icons/md";
import { styles } from "../styles";
import ButtonComp from "./ButtonComp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function DashboardNavbar({
  title,
  backArrow,
  button,
}: IDashboardNavbar) {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnClick = () => {
    router.push("/dashboard/candidate");
    
  };
  return (
    <div className="flex justify-between items-center px-5 pb-2 lg:px-8 lg:pb-5 font-shafarik lg:mt-0 mt-2">
      <div className={`${backArrow ? "flex items-center gap-2" : ""} sm:p-1`}>
        {backArrow && (
          <Link href={typeof backArrow === "string" ? backArrow : "/"}>
            <MdArrowBackIosNew />
          </Link>
        )}
        <h1 className={`${styles.titlePages}`}>{title}</h1>
      </div>
      {pathname !== "/dashboard/candidate" && button && (
        <ButtonComp
          text={button.text}
          IsWhite={button.IsWhite}
          onClick={handleOnClick}
        />
      )}
    </div>
  );
}
