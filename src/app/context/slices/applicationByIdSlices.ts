import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IApplicationByIdState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: IApplicationByIdState = {
  applicants: [],
  loading: false,
  error: null,
};

export const fetchApplicationById = createAsyncThunk(
  "fetchApplicationById",
  async (applicationId: string) => {
    const response = await fetch(`http://localhost:3000/api/get-application-by-id?id=${applicationId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch application data");
    }
    const application = await response.json();
    return application;
  }
);

const ApplicationByIdSlice = createSlice({
  name: "applicationById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch application";
      });
  },
});

export const selectData = (state:RootState) =>state.applicationById;
export default ApplicationByIdSlice.reducer;