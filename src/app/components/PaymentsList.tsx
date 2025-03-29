import { FaArrowLeft, FaArrowRight, FaFilter } from "react-icons/fa";
import { IPayment, PaymentsListProps } from "../Types";
import Badge from "./Badge";
import ButtonComp from "./ButtonComp";

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
  console.log(payments);
  return (
    <div className="mt-8 border-light">
      <div className="flex justify-between items-center border-bottom-light p-8">
        <button className="flex items-center gap-2 text-sm text-title-color border-light p-4">
          <FaFilter />
          <p>Filters</p>
        </button>
      </div>
      <div className="overflow-x-scroll max-w-[360px] md:max-w-full md:w-full text-center">
        <table className="w-full pe-8 ps-8">
          <thead className="border-bottom-light p-8">
            <tr>
              {Object.values(columns).map((column, index) => (
                <th key={index} className="text-not-focus-color p-8">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                {Object.keys(columns).map((key, index) => (
                  <td
                    key={index}
                    className="p-8 border-bottom-light text-center text-title-color font-medium"
                  >
                    {key === "status" ? (
                      <Badge
                        status={String(payment[key as keyof IPayment])}
                        color={String(payment[key as keyof IPayment])}
                      />
                    ) : key === "amount" ? (
                      <div className="text-lg font-[600]">
                        {payment[key as keyof IPayment]} CAD
                      </div>
                    ) : key === "createdAt" ||
                      key === "updatedAt" ? (
                      <div className="text-lg font-[500] text-gray-500">
                        {payment[key as keyof IPayment]
                          ? new Date(String(payment[key as keyof IPayment]))
                            .toLocaleDateString()
                          : "-"}
                      </div>
                    ) : key === "invoice" && payment.invoice ? (
                      <div className="flex justify-center">
                        <ButtonComp
                          text="Download Invoice"
                          IsWhite={false}
                          onClick={() => window.open(payment.invoice, '_blank')}
                        />
                      </div>
                    ) : (
                      payment[key as keyof IPayment]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-8 border-top-light">
        <div className="flex items-center gap-2">
          <span className="text-lg text-not-focus-color">View</span>
          <select
            className="border-light rounded p-2"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-lg text-not-focus-color">
            Payments per page
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded ${
                currentPage === page ? "bg-primary text-white bg-primary" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
