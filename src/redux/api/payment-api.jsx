import { api } from './index'

export const paymentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPayments: build.query({
      query: (params) => ({
        url: "/get/payments",
        params
      }),
      providesTags: ["Payments"]
    }),
    getPaymentById: build.query({
      query: ({params, _id}) => ({
        url: `/get/payments/${_id}`,
        params
      }),
      providesTags: ["Payments"]
    }),
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

export const { usePaymentForCustomerMutation, useGetPaymentsQuery, useGetPaymentByIdQuery } = paymentsApi