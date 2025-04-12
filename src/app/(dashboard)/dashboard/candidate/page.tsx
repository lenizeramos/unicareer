'use client';
import DashboardNavbar from "@/app/components/DashboardNavbar";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import JobAppliedGraphic from "@/app/components/Cards/JobAppliedGraphic";
import UserApplications from "@/app/components/UserApplications";
import { useCandidateData } from "@/Lib/client/candidate";

export default function CandidatePage() {
    const { candidate, isLoading } = useCandidateData();
    console.log(candidate);
    return (
        <>
            <DashboardNavbar title="Dashboard" button={{ text: "Back to home page", IsWhite: true }} />
            <div className={styles.borderBottomLight}></div>
            <DashboardWelcome greeting={`Good Morning, ${candidate?.firstName}`} message="Here is what's happening with your job applications from July 19 - July 25." date="Jul 19 - Jul 25" />
            <JobAppliedGraphic />
            <UserApplications />
        </>
    );
} 


