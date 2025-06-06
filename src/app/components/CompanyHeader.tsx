import { usePathname } from "next/navigation";
import { ICompanyHeader } from "../Types";
import { styles } from "../styles";
import ButtonComp from "./ButtonComp";
import FileDisplay from "./FileDisplay";

export default function CompanyHeader({
  image,
  name,
  userId,
  button,
  isDashboard = true,
}: ICompanyHeader) {

  const currentPath = usePathname();

  return (
    <div className="flex justify-between items-center p-2 gap-2 mb-8">
      <div className="flex items-center gap-2">
        {isDashboard && (
          <FileDisplay
            modelName="companyProfileImage"
            userId={userId || ""}
            width={90}
            height={90}
            className="profile-image-style overflow-hidden"
            fallbackImage={image || ""}
          />
        )}
        <div className="flex flex-col text-center">
          <h2 className={`${styles.titlePages}`}>{name}</h2>
        </div>
      </div>
      {currentPath !== "/dashboard/company/postjob" && button && (
        <ButtonComp
          text={button.text}
          IsWhite={button.IsWhite}
          icon={button.icon}
          onClick={button.onClick}
        />
      )}
    </div>
  );
}
