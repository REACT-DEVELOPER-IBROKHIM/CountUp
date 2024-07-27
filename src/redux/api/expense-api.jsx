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
  })
})

export const { useExpenseForSellersMutation } = expensesApi