import DashboardNavbar from "@/app/components/DashboardNavbar";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";

export default function CompanyPage() {
    return (
        <>
            <DashboardNavbar title="Dashboard" button={{ text: "Back to home page", IsWhite: true }} />
            <div className={styles.borderBottomLight}></div>
            <DashboardWelcome greeting="Good Morning, Sam" message="Here is what’s happening with your job applications from July 19 - July 25." date="Jul 19 - Jul 25" />
            
        </>
    )
}