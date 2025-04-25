import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlices";
import userReducer from "./slices/usersSlices";
import applicationsReducer from "./slices/applicationsSlices";
import companyReducer from "./slices/companySlice";
import jobToEditReducer from "./slices/jobToEditSlices";
import candidateReducer from "./slices/candidateSlice";


const store = configureStore({
  reducer: {
    jobs: jobReducer,
    users: userReducer,
    applications: applicationsReducer,
    companyState: companyReducer,
    jobToEdit: jobToEditReducer,
    candidateState: candidateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
