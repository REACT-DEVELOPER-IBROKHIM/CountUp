import { api } from './index'

export const paymentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    paymentForCustomer: build.mutation({
      query: ({body}) => ({
        url: `/create/payment`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Customers", "Payments"]
    }),
  })
})

export const { usePaymentForCustomerMutation } = paymentsApi