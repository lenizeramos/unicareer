"use client";
import { useEffect, useState } from "react";
import { styles } from "@/app/styles";
import PaymentsList from "@/app/components/PaymentsList";
import { IPayment } from "@/app/Types";
import CompanyHeaderPaymentButton from "@/app/components/CompanyHeaderPaymentButton";
import DateRangePicker from "@/app/components/DateRangePicker";
import { monthNames } from "@/app/constants";

export default function CompanyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const columns = {
    amount: "Amount",
    status: "Status",
    createdAt: "Date",
    invoice: "Download",
  };

  useEffect(() => {

    const fetchCompanyPayments = async () => {
      let queryParams = "";
      if (startDate && endDate) {
        queryParams += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }
      try {
        const response = await fetch(`/api/get-company-payments${queryParams}`);
        if (response.ok) {
          const payments = await response.json();
          setPayments(payments);
        } else {
          console.error("Failed to fetch payments");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchCompanyPayments();
  }, [startDate, endDate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const getDate = (date: Date | undefined | null) => {
    if (!date) {
      return <p>Not Found</p>;
    }
    const createDate = date;
    console.log(createDate.toUTCString(), "createDateeeee");
    const month = monthNames[createDate.getMonth()];
    return `${month} ${createDate.getDate()}`;
  };
  return (
    <>
      <CompanyHeaderPaymentButton />
      <div className={styles.borderBottomLight}></div>

      <div className="flex xs:flex-row flex-col gap-y-5 justify-between xs:items-center border border-gray-200 px-5 py-8 w-full">
        <div>
          <p className={`${styles.JobDescriptionText}`}>
            All the payments you have made{" "}
            {startDate && endDate && (
              <>
                from {getDate(startDate)} - {getDate(endDate)}
              </>
            )}
          </p>
        </div>
        <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

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
