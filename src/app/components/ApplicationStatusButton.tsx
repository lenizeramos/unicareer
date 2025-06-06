"use client";
import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";
import { IStatusButtonProps } from "@/app/Types/index";

const ApplicationStatusButton = ({
  applicationId,
  currentStatus,
  targetStatus,
  label,
  setStatus,
}: IStatusButtonProps) => {
  const handleStatusChange = () => {
    if (currentStatus === targetStatus) {
      return
    }
    confirmDialog({
      message: (
        <div>
          <p>Do you want to change the status of this application?</p>
          <span className="text-sm text-gray-500">The candidate will be notified.</span>
        </div>
      ),
      header: `${label} Confirmation`,
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      rejectClassName: "p-button-danger",
      acceptLabel: "Yes",
      rejectLabel: "Cancel",
      accept: async () => {
        try {
          const res = await fetch(`/api/application/${applicationId}/update/`, {
            method: "PATCH",
            body: JSON.stringify({ status: targetStatus }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Error updating status");

          setStatus(targetStatus);
          toast.success(`Status updated!`);
        } catch (error) {
          toast.error("Error updating status: " + error);
        }
      },
    });
  };

  return (
    <ButtonComp
      text={label}
      IsWhite={false}
      width="w-full"
      onClick={handleStatusChange}
      isDissable={
        currentStatus === targetStatus ||
        currentStatus === "HIRED" ||
        currentStatus === "REJECTED"
      }
    />
  );
};

export default ApplicationStatusButton;
