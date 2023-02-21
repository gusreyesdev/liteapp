import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    isLoading: undefined,
    companies: [
    ],
    items: []
  },
  reducers: {
    onLoadCompanies: (state, { payload = [] }) => {
      state.isLoading = false;

      payload.forEach((company) => {
        const exists = state.companies.some(
          (dbcompany) => dbcompany.nit === company.nit
        );
        if (!exists) {
          state.companies.push(company);
        }
      });
      


    },

    onStartLoading: (state) =>{
      state.isLoading = true
    },

    onFinishLoading : (state) =>{
      state.isLoading = false
    }

  },
});

export const { onLoadCompanies,onStartLoading, onFinishLoading } = companySlice.actions;
