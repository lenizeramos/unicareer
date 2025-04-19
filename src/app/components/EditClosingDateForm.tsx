"use client";
import { useState } from "react";
import ButtonComp from "./ButtonComp";
/* import { useRouter } from "next/navigation"; */
import { toast } from "sonner";

interface EditClosingDateFormProps {
  jobId: string;
  currentClosingDate: Date;
  closeDialog: () => void;
  onSuccess: (newClosingDate: Date) => void;
}

const EditClosingDateForm = ({
  jobId,
  currentClosingDate,
  closeDialog,
  onSuccess
}: EditClosingDateFormProps) => {
  const [closingDate, setClosingDate] = useState<Date>(
    new Date(currentClosingDate)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
 /*  const router = useRouter(); */

  const handleSubmit = async () => {
      closeDialog();
      onSuccess(closingDate);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Update Closing Date</h3>
        <span>
          You can edit just the closing date for jobs that alredy received
          applications
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Closing Date
        </label>
        <input
          type="datetime-local"
          value={closingDate.toISOString().slice(0, 16)}
          onChange={(e) => setClosingDate(new Date(e.target.value))}
          className="w-full p-2 border rounded"
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <ButtonComp
          text="Cancel"
          IsWhite={true}
          width="w-24"
          onClick={closeDialog}
        />
        <ButtonComp
          text={isSubmitting ? "Saving..." : "Save"}
          IsWhite={false}
          width="w-24"
          onClick={handleSubmit}
          isDissable={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditClosingDateForm;
