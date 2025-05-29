"use client";
import { FaCheckCircle } from "react-icons/fa";
import { styles } from "@/app/styles";
import ButtonComp from "@/app/components/ButtonComp";
import { useRouter } from "next/navigation";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";

const PaymentSuccess = () => {
  const router = useRouter();
  return (
    <>
      <CompanyHeaderPaymentButton
        isDashboard={false}
        pageName="Payment Successful"
      />
      <div className={`${styles.borderBottomLight} `}></div>
      <div className="flex flex-col items-center h-full w-[80%] p-4 justify-center fixed">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full border border-gray-200">
          <div className="flex justify-center">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 font-shafarik">
            Payment Successful
          </h1>
          <p className="text-lg text-center text-gray-600 mt-2 font-monomakh">
            Your payment has been successfully processed. Click the button below
            to continue and post a new job.
          </p>
          <div className="flex justify-center mt-8">
            <ButtonComp
              text="Post a Job"
              IsWhite={false}
              onClick={() => router.push("/dashboard/company/postjob")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
