import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICandidateState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: ICandidateState = {
  candidate: undefined,
  loading: false,
  error: null,
};

export const fetchCandidate = createAsyncThunk("candidate/fetch", async () => {
  try {
    const response = await fetch("/api/candidate/get-candidate-by-clerk-id");
    if (!response.ok) throw new Error("Failed to fetch candidate");


const candidate = await response.json();
    return candidate
  } catch (error) {
    console.error("Error fetching candidate:", error);
    throw error;
  }
});

const CandidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
      })
      .addCase(fetchCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching candidate";
      });
  },
});

export const selectCandidate = (state: RootState) => state.candidateState;
export default CandidateSlice.reducer;
