import { api } from './index'

export const customersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: (params) => ({
        url: "/get/customers",
        params
      }),
      providesTags: ["Customers"]
    }),
    getSingleCustomer:  build.query({
      query: ({id}) => ({
        url: `/get/customer/${id}`
      }),
      providesTags: ["Customers"]
    }),
    updateCustomer: build.mutation({
      query: ({body, _id}) => ({
        url: `/update/customer/${_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Customers"]
    }),
    pinCustomer: build.mutation({
      query: ({body, _id}) => ({
        url: `/update/customer/${_id}`,
        method: "PATCH",
        body: {
          ...body,
          pin: !body.pin
        }
      }),
      invalidatesTags: ["Customers"]
    }),
    paymentForCustomer: build.mutation({
      query: ({body}) => ({
        url: `/create/payment`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Customers"]
    })
  })
})

export const { useGetCustomersQuery, useGetSingleCustomerQuery, useUpdateCustomerMutation, usePinCustomerMutation, usePaymentForCustomerMutation } = customersApi