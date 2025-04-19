"use client";
import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";
/* import { IStatusButtonProps } from "@/app/Types/index"; */
import { useRouter } from "next/navigation";

interface IDeleteJobButtonProps {
    jobId: string
    label: string
}

const DeleteJobButton = ({
    jobId,
    label,
}: IDeleteJobButtonProps) => {
    const router = useRouter();
  const handleStatusChange = () => {
    confirmDialog({
      message: `Do you want to delete this job?`,
      header: `${label} Confirmation`,
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      rejectClassName: "p-button-danger",
      acceptLabel: "Yes",
      rejectLabel: "Cancel",
      accept: async () => {
        try {
          const res = await fetch(`/api/job/${jobId}/delete/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Error deteling job");

          router.push(`/dashboard/company/joblisting`);
          toast.success(`Job Deleted! ${jobId}`);
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
    />
  );
};

export default DeleteJobButton;
