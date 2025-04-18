"use client";
import { useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";

const InterviewButton = ({
  applicationId,
  status: initialStatus,
}: {
  applicationId: string;
  status?: string;
}) => {
  const [status, setStatus] = useState(initialStatus);
  const handleConfirmInterview = () => {
    confirmDialog({
      message: "Do you want to interview this candidate?",
      header: "Interview Confirmation",
      icon: "pi pi-exclamation-triangle",
      /* defaultFocus: "reject",
      acceptClassName: "p-button-danger", */
      defaultFocus: "accept",
      acceptLabel: "Yes",
      rejectLabel: "Cancel",
      accept: async () => {
        try {
          const res = await fetch(`/api/application/update/${applicationId}`, {
            method: "PATCH",
          });

          if (!res.ok) throw new Error("Error updating status");
          setStatus("INTERVIEWED");
          toast.success("Status updated to INTERVIEW!");
        } catch (error) {
          toast.error("Error updating status: " + error);
        }
      },
    });
  };

  return (
    <ButtonComp
      text="Interview"
      IsWhite={false}
      width="w-full"
      onClick={handleConfirmInterview}
      isDissable={status === "INTERVIEWED"}
    />
  );
};

export default InterviewButton;
