import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlices";
import userReducer from "./slices/usersSlices";
import applicationsReducer from "./slices/applicationsSlices";
import companyJobsReducer from "./slices/companyJobsSlice";
import applicationByIdReducer from "./slices/applicationByIdSlices";


const store = configureStore({
  reducer: {
    jobs: jobReducer,
    users: userReducer,
    applications: applicationsReducer,
    companyJobs: companyJobsReducer,
    applicationById: applicationByIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
