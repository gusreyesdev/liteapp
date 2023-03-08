import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariables } from "../../helpers";

const { VITE_API_URL } = getEnvVariables();

export const apiSlice = createApi({
  reducerPath: "companyapi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
  }),

  endpoints: (builder) => ({

    getCompanies: builder.query({
      query: () => '/companies/getCompanies',
      providesTags: ["Companies"],
    }),

    getCompaniesByUser: builder.query({
      query: (userId) => `/companies/getCompaniesByUser/${userId}`,
      providesTags: ["Companiesbyuser"],
    }),

    createCompany: builder.mutation({
      query: (company) => ({
        url: "/companies/createCompany",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["Companies"],
    }),

    updateCompany: builder.mutation({
      query: (company) => ({
        url: `/companies/updateCompany/${company.nit}`,
        method: "PUT",
        body: company,
      }),
      invalidatesTags: ["Companies"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/deleteCompany/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Companies"],
    }),

    getUsers: builder.query({
      query: () => '/user/getUsers',
      providesTags:["Users"]
    })

  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompaniesByUserQuery,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
  useGetUsersQuery
} = apiSlice;
