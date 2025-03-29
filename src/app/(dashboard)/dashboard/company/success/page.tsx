"use client";
import CompanyHeader from "@/app/components/CompanyHeader";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { styles } from "@/app/styles";
import ButtonComp from "@/app/components/ButtonComp";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
  return (
    <>
            <CompanyHeader image="/img/company_logo.png" name="Nomad" button={{ text: "Post a Job", IsWhite: false, width: "w-xs", icon: <FaPlus /> }} />
            <div className={styles.borderBottomLight}></div>
            <DashboardWelcome greeting="Job Listing" message="Here is your jobs listing status from July 19 - July 25." date="Jul 19 - Jul 25" />
            <div className="flex flex-col items-center h-scree p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full border border-gray-200">
                    <div className="flex justify-center">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                    Payment Successful
                    </h1>
                    <p className="text-lg text-center text-gray-600 mt-2">
                    Your payment has been successfully processed. Click the button below to continue and post a new job.
                    </p>
                    <div className="flex justify-center mt-8">
                        <ButtonComp text="Post a Job" IsWhite={false} onClick={() => router.push("/dashboard/company/postjob")}/>
                    </div>
                </div>
            </div>
    </>
  );
};

export default PaymentSuccess;