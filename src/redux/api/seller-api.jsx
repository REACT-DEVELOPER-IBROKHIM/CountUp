import { api } from './index'

export const sellersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query({
      query: () => ({
        url: "/get/sellers?limit=30&skip=0"
      }),
      providesTags: ["Sellers"]
    }),
    updateSellers: build.mutation({
      query: ({body, _id}) => ({
        url: `/update/seller/${_id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Sellers"]
    }),
    pinSellers: build.mutation({
      query: ({body, _id}) => ({
        url: `/update/seller/${_id}`,
        method: "PATCH",
        body: {
          ...body,
          pin: !body.pin
        }
      }),
      invalidatesTags: ["Sellers"]
    })
  })
})

export const { useGetSellersQuery, useUpdateSellersMutation, usePinSellersMutation } = sellersApi