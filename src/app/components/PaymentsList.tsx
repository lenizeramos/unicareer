import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IPayment, PaymentsListProps } from "../Types";
import Badge from "./Badge";
import ButtonComp from "./ButtonComp";
import SearchNotFound from "./SearchNotFound";
import Loader from "./Loader";

export default function PaymentsList({
  payments,
  columns,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalItems,
}: PaymentsListProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="w-full mt-4 md:mt-8">
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-semibold">
        {Object.values(columns).map((column, index) => (
          <div key={index} className="text-center">
            {column}
          </div>
        ))}
      </div>

      <div className="space-y-4 md:space-y-0">
        {payments.map((payment, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-lg md:rounded-none md:border-0 md:border-b md:grid md:grid-cols-4 md:gap-4"
          >
            {Object.keys(columns).map((key, index) => (
              <div key={index} className="py-2 md:py-0 text-center">
                <div className="md:hidden text-sm text-gray-500 mb-1">
                  {columns[key]}
                </div>
                {key === "status" ? (
                  <Badge
                    status={String(payment[key as keyof IPayment])}
                    color={String(payment[key as keyof IPayment])}
                  />
                ) : key === "amount" ? (
                  <div className="text-lg font-semibold text-gray-600">
                    {payment[key as keyof IPayment]} CAD
                  </div>
                ) : key === "createdAt" || key === "updatedAt" ? (
                  <div className="text-lg font-[500] text-gray-500">
                    {payment[key as keyof IPayment]
                      ? new Date(
                          String(payment[key as keyof IPayment])
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                ) : key === "invoice" && payment.invoice ? (
                  <div className="flex justify-center">
                    <ButtonComp
                      text="Download Invoice"
                      IsWhite={false}
                      onClick={() => window.open(payment.invoice, "_blank")}
                    />
                  </div>
                ) : (
                  payment[key as keyof IPayment]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {payments.length === 0 && (
        <SearchNotFound text="No Payments found." optionSubText={false} />
      )}

      <div className="md:flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 border-t mt-6 rounded-b-lg font-shafarik hidden">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-gray-600 ">View</span>
          <select
            className="rounded px-2 py-1 text-xs sm:text-sm border-light"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <span className="text-gray-600">payments per page</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded disabled:opacity-50"
          >
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
