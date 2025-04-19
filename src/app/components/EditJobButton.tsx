"use client";
import { toast } from "sonner";
import ButtonComp from "./ButtonComp";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setJobToEdit } from "@/app/context/slices/jobToEditSlices";
import { IJob } from "@/app/Types/index";
import { AppDispatch } from "@/app/context/store";

interface EditJobButtonProps {
  /* jobId: string; */
  jobApplications: number;
  jobData: IJob;
}

const EditJobButton = ({ jobApplications, jobData }: EditJobButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = () => {
    if (jobApplications > 0) {
      toast.error("You cannot edit a job with applications.");
      return;
    }
    dispatch(setJobToEdit(jobData));
    router.push("/dashboard/company/postjob");
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
