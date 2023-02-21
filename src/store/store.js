
import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './reducers/auth/authSlice';
import { uiSlice } from './reducers/ui/uiSlice';
import { companySlice } from './reducers/company/companySlice';


export const store = configureStore({

    reducer:{
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        company:companySlice.reducer
    },

    /*
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    */

});