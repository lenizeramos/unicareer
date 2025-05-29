import CompanyHeader from "./CompanyHeader";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCompany } from "@/app/context/slices/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/context/store";
import { clearJobToEdit } from "@/app/context/slices/jobToEditSlices";
import Loader from "./Loader";

export default function CompanyHeaderPaymentButton({ isDashboard, pageName }: { isDashboard: boolean, pageName: string }) {
  const router = useRouter();
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector((state: RootState) => state.companyState.company);
  const isLoading = useSelector(
    (state: RootState) => state.companyState.loading
  );

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  const handleButtonClick = async () => {
    await dispatch(clearJobToEdit());
    router.push("/dashboard/company/postjob");
  };

  const handlePaymentClick = async () => {
    const companyId = company?.id;

    if (!companyId) {
      console.error("No company ID available");
      return;
    }
    try {
      const response = await fetch("/api/company/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const checkMembershipStatus = async () => {
      try {
        const response = await fetch("/api/company/membership-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setShowPaymentButton(data.isActive);
        } else {
          console.error("Error:", data.error);
          setShowPaymentButton(false);
        }
      } catch (error) {
        console.error("Error checking membership status:", error);
        setShowPaymentButton(false);
      }
    };

    checkMembershipStatus();
  }, []);

  const buttonText = isLoading
    ? "Loading..."
    : showPaymentButton
    ? "Post a Job"
    : "Get a membership";
  const buttonClick = showPaymentButton
    ? handleButtonClick
    : handlePaymentClick;

  if (!company?.userId) {
    return (
      <div className="flex min-h-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <CompanyHeader
      image="/img/img.png"
      name={pageName}
      userId={company.userId}
      isDashboard={isDashboard}
      button={{
        text: buttonText,
        IsWhite: false,
        width: "w-xs",
        icon: <FaPlus />,
        onClick: buttonClick,
      }}
    />
  );
}
