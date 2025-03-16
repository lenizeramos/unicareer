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
            <div className="w-full flex justify-center items-center flex-col gap-5">
                <div className="flex flex-row gap-5">
                    <CardsContainer cardId={"dashboardCard"} params={[{title: "Total Companies", total: 20, icon: GrDocumentText, cardId: "dashboardCard"}]} />
                    <CardsContainer cardId={"dashboardCard"} params={[{title: "Total Jobs Posted", total: 10, icon: GrDocumentText, cardId: "dashboardCard"}]} />
                </div>
                <div className="flex flex-row gap-5">
                    <CardsContainer cardId={"dashboardCard"} params={[{title: "Total Applicants", total: 20, icon: LuMessageCircleQuestion, subicons: BiMessageRoundedDetail, cardId: "dashboardCard"}]} />
                    <CardsContainer cardId={"dashboardCard"} params={[{title: "Total Payments", total: 10, icon: LuMessageCircleQuestion, subicons: BiMessageRoundedDetail, cardId: "dashboardCard"}]} />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-5">
                <div className={styles.borderLight + " mt-8 pl-4 pr-4 pb-4 w-3/4"}>
                    <div className={styles.borderBottomLight + " flex justify-between items-center p-8 mb-8"}>
                        <h2 className="text-xl text-title-color font-bold">Recent Jobs Posted</h2>
                    </div>
                    <CardsContainer cardId={"recentPosted"} params={[{title: "Social Media Assistant", date: "25 October 2024", company: "Google", text: "Full-time", cardId: "dashboardCard"}, {title: "React Developer", date: "12 March 2025", company: "Facebook", text: "Part-time", cardId: "dashboardCard"}]} />
                </div>
            </div>
        </>
    )
}