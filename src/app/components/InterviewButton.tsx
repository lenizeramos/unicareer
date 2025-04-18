import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";

const InterviewButton = ({ applicationId }: { applicationId: string }) => {
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
      IsWhite={true}
      width="w-full"
      onClick={handleConfirmInterview}
    />
  );
};

export default InterviewButton;
