import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";

export default function CompanyPage() {
    return (
        <>
            <CompanyHeader image="/img/company_logo.png" name="Nomad" button={{ text: "Post a Job", IsWhite: false, width: "w-xs", icon: <FaPlus /> }} />
            <div className={styles.borderBottomLight}></div>
            <DashboardWelcome greeting="Good Morning, Sam" message="Here is what’s happening with your job applications from July 19 - July 25." date="Jul 19 - Jul 25" />
            
        </>
    )
}