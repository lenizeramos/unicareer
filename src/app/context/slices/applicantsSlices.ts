import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IApplicantsState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: IApplicantsState = {
  applicants: [],
  loading: false,
  error: null,
};

export const fetchApplicants = createAsyncThunk(
  "fetchApplicants",
  async () => {
    const response = await fetch("http://localhost:3000/api/get-applicants");
    if (!response.ok) {
      throw new Error("Failed to fetch applicants");
    }
    const applicants = await response.json();
    return applicants;
  }
);

const ApplicantsSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Failed to fetch applicants");
      });
  },
});

export const selectData = (state:RootState) =>state.applicants;
export default ApplicantsSlice.reducer;