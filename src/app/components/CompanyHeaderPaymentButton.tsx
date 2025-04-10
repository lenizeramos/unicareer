import CompanyHeader from "./CompanyHeader";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCompanyData } from "@/Lib/client/company";

export default function CompanyHeaderPaymentButton() {
  const router = useRouter();
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const { companyId, isLoading } = useCompanyData();

  const handleButtonClick = () => {
    router.push("/dashboard/company/postjob");
  };

  const handlePaymentClick = async () => {
    if (!companyId) {
      console.error("No company ID available");
      return;
    }
    try {
      const response = await fetch("/api/create-payment-intent", {
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

  const buttonText = isLoading ? "Loading..." : showPaymentButton ? "Post a Job" : "Get a membership";
  const buttonClick = showPaymentButton ? handleButtonClick : handlePaymentClick;

  return (
    <CompanyHeader
      image="/img/company_logo.png"
      name="Nomad"
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
