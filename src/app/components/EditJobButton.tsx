"use client";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";
import { useRouter } from "next/navigation";

interface EditJobButtonProps {
  jobId: string;
  jobApplications: number;
}

const EditJobButton = ({ jobId, jobApplications }: EditJobButtonProps) => {
  const router = useRouter();

  const handleEditClick = () => {
    if (jobApplications > 0) {
      toast.error("You cannot edit a job with applications.");
      return;
    }
  };

  return (
    <ButtonComp
      text="Edit Job"
      IsWhite={false}
      width="w-full"
      onClick={handleEditClick}
    />
  );
};

export default EditJobButton;
