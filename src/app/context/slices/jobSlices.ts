import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IDataState } from "../../Types/slices";
import { RootState } from "../store";

const initialState: IDataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAll",
  async () => {
    const response = await fetch("http://localhost:3000/api/getJobs");
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
        state.data = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      });
  },
});

export const selectData = (state: RootState) => state.jobs;
export default JobsSlice.reducer;
