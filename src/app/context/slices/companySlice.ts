import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICompanyState } from "@/app/Types/slices";
import { RootState } from "../store";

const initialState: ICompanyState = {
  company: undefined,
  loading: false,
  error: null,
};

export const fetchCompany = createAsyncThunk("company/fetch", async () => {
  try {
    const response = await fetch(`/api/company/get-company`);
    if (!response.ok) throw new Error("Failed to fetch company");
    const company = await response.json();
    
    return company;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
});

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching company";
      });
  },
});

export const selectCompany = (state: RootState) => state.companyState;
export default CompanySlice.reducer;
