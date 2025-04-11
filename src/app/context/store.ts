import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlices";
import userReducer from "./slices/usersSlices";
import applicantsReducer from "./slices/applicantsSlices";
import companyJobsReducer from "./slices/companyJobsSlice";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    users: userReducer,
    applicants: applicantsReducer,
    companyJobs: companyJobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
