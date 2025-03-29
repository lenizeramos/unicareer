"use client";
import { useEffect, useState } from "react";
import DashboardWelcome from "@/app/components/DashboardWelcome";
import { styles } from "@/app/styles";
import CompanyHeader from "@/app/components/CompanyHeader";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PaymentsList from "@/app/components/PaymentsList";
import { IPayment } from "@/app/Types";

const fetchCompanyPayments = async () => {
  try {
    const response = await fetch(`/api/get-company-payments`);
    if (response.ok) {
      const payments = await response.json();
      return payments;
    } else {
      console.error("Failed to fetch payments");
    }
  } catch (error) {
    console.error("Error fetching payments:", error);
  }
};

export default function CompanyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [payments, setPayments] = useState<IPayment[]>([]);
  const router = useRouter();

  const columns = {
    amount: "Amount",
    status: "Status",
    createdAt: "Date"
  };

  const handleButtonClick = () => {
    router.push("/dashboard/company/postjob");
  };

  useEffect(() => {
    const getPayments = async () => {
      const fetchedPayments = await fetchCompanyPayments();
      console.log(fetchedPayments, "fetchCompanyPayments")
      if (fetchedPayments) {
        setPayments(fetchedPayments);
      }
    };
    getPayments();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CompanyHeader
        image="/img/company_logo.png"
        name="Nomad"
        button={{
          text: "Post a Job",
          IsWhite: false,
          width: "w-xs",
          icon: <FaPlus />,
          onClick: handleButtonClick,
        }}
      />
      <div className={styles.borderBottomLight}></div>
      <DashboardWelcome
        greeting="Payments List"
        message="Here is your payments list from July 19 - July 25."
        date="Jul 19 - Jul 25"
      />
      <PaymentsList
        payments={currentPayments}
        columns={columns}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={payments.length}
      />
    </>
  );
}
