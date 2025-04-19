"use client";
/* import { toast } from "sonner"; */
import ButtonComp from "./ButtonComp";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setJobToEdit } from "@/app/context/slices/jobToEditSlices";
import { IJob } from "@/app/Types/index";
import { AppDispatch } from "@/app/context/store";
import { useState } from "react";
import EditClosingDateForm from "./EditClosingDateForm";

import { Dialog } from "primereact/dialog";

interface EditJobButtonProps {
  jobApplications: number;
  jobData: IJob;
  onUpdateClosingDate: (newClosingDate: Date) => void;
}

const EditJobButton = ({ jobApplications, jobData, onUpdateClosingDate }: EditJobButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showDialog, setShowDialog] = useState(false);

  const handleEditClick = () => {
    if (jobApplications > 0) {
      setShowDialog(true);
    } else {
      dispatch(setJobToEdit(jobData));
      router.push("/dashboard/company/postjob");
    }
  };

  return (
    <>
      <ButtonComp
        text="Edit Job"
        IsWhite={false}
        width="w-full"
        onClick={handleEditClick}
      />

      {showDialog && jobData.id && (
        <Dialog
          visible={showDialog}
          onHide={() => setShowDialog(false)}
          closable
          draggable={false}
          dismissableMask
        >
          <EditClosingDateForm
            jobId={jobData.id}
            currentClosingDate={new Date(jobData.closingDate)}
            closeDialog={() => setShowDialog(false)}
            onSuccess={onUpdateClosingDate}
          />
        </Dialog>
      )}
    </>
  );
};

export default EditJobButton;
