import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./reducers/auth/authSlice";
import { uiSlice } from "./reducers/ui/uiSlice";
import { companySlice } from "./reducers/company/companySlice";
import { apiSlice } from "./api/apiSlices";


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    company: companySlice.reducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
