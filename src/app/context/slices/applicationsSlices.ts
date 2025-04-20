import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IApplicationsState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: IApplicationsState = {
  applications: [],
  loading: false,
  error: null,
};

export const fetchApplications = createAsyncThunk(
  "fetchApplications",
  async () => {
    const response = await fetch("http://localhost:3000/api/application/get-applications");
    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }
    const applications = await response.json();
    return applications;
  }
);

const ApplicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch applications";
      });
  },
});

export const selectData = (state:RootState) =>state.applications;
export default ApplicationsSlice.reducer;