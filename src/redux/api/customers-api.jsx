import { api } from './index'

export const customersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: () => ({
        url: "/get/customers?limit=30&skip=0"
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
    })
  })
})

export const { useGetCustomersQuery, useUpdateCustomerMutation, usePinCustomerMutation } = customersApi