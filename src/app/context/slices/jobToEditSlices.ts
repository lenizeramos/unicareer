import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJobToEditState } from "@/app/Types/slices";
import { IJob } from "@/app/Types/index";

const initialState: IJobToEditState = {
  jobToEdit: null,
};

export const jobToEditSlices = createSlice({
  name: "jobToEdit",
  initialState,
  reducers: {
    setJobToEdit: (state, action: PayloadAction<IJob>) => {
      state.jobToEdit = action.payload;
    },
    clearJobToEdit: (state) => {
      state.jobToEdit = null;
    },
  },
});

export const { setJobToEdit, clearJobToEdit } = jobToEditSlices.actions;
export default jobToEditSlices.reducer;
