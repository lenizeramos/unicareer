import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICandidateState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: ICandidateState = {
  candidate: [],
  loading: false,
  error: null,
};

export const fetchCandidate = createAsyncThunk("fetchCandidate", async () => {
  const response = await fetch("http://localhost:3000/api/get-candidate");
  if (!response.ok) {
    throw new Error("Failed to fetch candidate");
  }
  const candidate = await response.json();
  return candidate;
});

const CandidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidate.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchCandidate.fulfilled, (state, action) => {
        (state.loading = false), (state.candidate = action.payload);
      })
      .addCase(fetchCandidate.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Failed to fetch candidate");
      });
  },
});

export const selectData = (state: RootState) => state.candidate;
export default CandidateSlice.reducer;
