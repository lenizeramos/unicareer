import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlices";
import userReducer from "./slices/usersSlices";
import applicationsReducer from "./slices/applicationsSlices";
import companyReducer from "./slices/companySlice";


const store = configureStore({
  reducer: {
    jobs: jobReducer,
    users: userReducer,
    applications: applicationsReducer,
    companyState: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
