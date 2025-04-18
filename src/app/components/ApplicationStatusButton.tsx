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
    confirmDialog({
      message: `Do you want to change status to ${targetStatus.toLowerCase()}?`,
      header: `${label} Confirmation`,
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      rejectClassName: "p-button-danger",
      acceptLabel: "Yes",
      rejectLabel: "Cancel",
      accept: async () => {
        try {
          const res = await fetch(`/api/application/update/${applicationId}`, {
            method: "PATCH",
            body: JSON.stringify({ status: targetStatus }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Error updating status");

          setStatus(targetStatus);
          toast.success(`Status updated to ${targetStatus.toLowerCase()}!`);
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
      isDissable={currentStatus === targetStatus}
    />
  );
};

export default ApplicationStatusButton;
