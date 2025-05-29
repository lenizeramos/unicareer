import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IJobsState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: IJobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchAllJobs = createAsyncThunk(
  "fetchAllJobs",
  async () => {
    const response = await fetch("/api/job/get-jobs");
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const jobs = await response.json();
    return jobs;
  }
);

const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      });
  },
});
export const selectData = (state: RootState) => state.jobs;
export default JobsSlice.reducer;
