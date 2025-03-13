import DashboardNavbar from "@/app/components/DashboardNavbar";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CardsContainer from "@/app/components/Cards/CardsContainer";
import { GrDocumentText } from "react-icons/gr";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { BiMessageRoundedDetail } from "react-icons/bi";

export default function AdminDashboardPage() {
    return (
        <>
            <DashboardNavbar title="Dashboard" button={{ text: "Back to home page", IsWhite: true }} />
            <div className={styles.borderBottomLight}></div>
            <DashboardWelcome greeting="Good Morning, Sam" message="Here is what's happening with your job applications from July 19 - July 25." date="Jul 19 - Jul 25" />
            <div>
                <CardsContainer cardId={"dashboardCard"} params={[{title: "Total Companies", total: 20, icon: GrDocumentText, cardId: "dashboardCard"}]} />
                <CardsContainer cardId={"dashboardCard"} params={[{title: "Total Applicants", total: 10, icon: LuMessageCircleQuestion, subicons: BiMessageRoundedDetail, cardId: "dashboardCard"}]} />
            </div>
            <div className="mt-8 border-light">
                <div className="flex justify-between items-center border-bottom-light p-8">
                    <h2 className="text-xl text-title-color font-bold">Job List</h2>
                    <button className="flex items-center gap-2 text-sm text-title-color border-light p-4">

                        <p>Filters</p>
                    </button>
                </div>
                <div className="overflow-x-scroll max-w-[360px] md:max-w-full md:w-full text-center">
                    
                </div>
                
                
            </div>
        </>
    )
}