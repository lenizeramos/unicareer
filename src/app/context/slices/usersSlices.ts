import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserState } from "../../Types/slices";
import { RootState } from "../store";

const initialState: IUserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (role: string) => {
    const url = role
      ? `http://localhost:3000/api/user/get-users?role=${role}`
      : "http://localhost:3000/api/user/get-users";
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error(
        `${role ? `Failed to fetch ${role}` : "Failed to fetch users"}`
      );
    }
    const users = await response.json();
    return users;
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      });
  },
});
export const selectData = (state: RootState) => state.users;
export default UsersSlice.reducer;
