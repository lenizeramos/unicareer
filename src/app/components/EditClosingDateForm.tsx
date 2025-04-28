"use client";
import { useState } from "react";
import ButtonComp from "./ButtonComp";

interface EditClosingDateFormProps {
  currentClosingDate: Date;
  closeDialog: () => void;
  onSuccess: (newClosingDate: Date) => void;
}

const EditClosingDateForm = ({
  currentClosingDate,
  closeDialog,
  onSuccess,
}: EditClosingDateFormProps) => {
  const [closingDate, setClosingDate] = useState<Date>(
    new Date(currentClosingDate)
  );

  const handleSubmit = async () => {
    closeDialog();
    onSuccess(closingDate);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4 font-monomakh">Update Closing Date</h3>
        <span className="font-shafarik">
        This job has received applications. You can update the closing date, but other details cannot be changed.
        </span>
      </div>

      <div className="mb-4 font-shafarik">
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
          text={"Save"}
          IsWhite={false}
          width="w-24"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditClosingDateForm;
