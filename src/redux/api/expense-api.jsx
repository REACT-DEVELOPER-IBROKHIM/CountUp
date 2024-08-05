import { api } from './index'

export const expensesApi = api.injectEndpoints({
  endpoints: (build) => ({
    expenseForSellers: build.mutation({
        query: ({body}) => ({
            url: `/create/expense`,
            method: "POST",
            body
          }),
          invalidatesTags: ["Sellers", "Expenses"]
    }),
    getExpenseById: build.query({
      query: ({_id, params }) => ({
        url: `/get/expenses/${_id}`,
        params
      }),
      providesTags: ["Expenses"]
    }),
    expenseForSeller: build.mutation({
      query: ({body}) => ({
        url: `/create/expense`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Sellers", "Expenses"]
    }),
  })
})

export const { useExpenseForSellersMutation, useGetExpenseByIdQuery, useExpenseForSellerMutation } = expensesApi