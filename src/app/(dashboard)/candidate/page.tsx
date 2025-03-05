import { styles } from "@/app/styles";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function CandidatePage() {
    return (
        <>
            <div>
                <h1 className={styles.dashboardTitle}>Dashboard</h1>
            </div>
                <div className="border-light">
            </div>
            <div className="flex justify-between items-center p-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl text-title-color">Good Morning, Sam</h2>
                    <p className="text-base text-not-focus-color">Here is what’s happening with your job applications from July 19 - July 25.</p>
                </div>
                <div className="flex items-center gap-2">                    
                    <p className="text-sm text-title-color">Jul 19 - Jul 25</p>
                    <FaRegCalendarAlt color="#4640DE" />
                </div>
            </div>
        </>
    )
}