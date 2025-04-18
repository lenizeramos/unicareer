"use client";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";

interface EditJobButtonProps {
  jobId: string;
}

const EditJobButton = ({ jobId }: EditJobButtonProps) => {
  const handleJobChange = async () => {
    try {
      const res = await fetch(`/api/job/${jobId}/update/`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Error updating job");

      toast.success("Job updated!");
    } catch (error) {
      toast.error("Error updating status: " + error);
    }
  };

  return (
    <ButtonComp
      text="Edit Job"
      IsWhite={false}
      width="w-full"
      onClick={handleJobChange}
    />
  );
};

export default EditJobButton;
