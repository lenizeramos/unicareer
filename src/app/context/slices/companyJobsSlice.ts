import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICompanyJobsState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: ICompanyJobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchCompanyJobs = createAsyncThunk(
  "companyJobs/fetch",
  async () => {
    try {
      const response = await fetch(`/api/get-company-jobs`);
      if (!response.ok) throw new Error("Failed to fetch company jobs");
      const jobs = await response.json();
      console.log("JOBSSSSS", jobs)
      return jobs;
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  }
);

const CompanyJobsSlice = createSlice({
  name: "companyJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchCompanyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching company jobs";
      });
  },
});

export const selectCompanyJobs = (state: RootState) => state.companyJobs;
export default CompanyJobsSlice.reducer;
