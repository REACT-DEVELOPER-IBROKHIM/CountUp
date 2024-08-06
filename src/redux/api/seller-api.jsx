import { api } from "./index";

export const sellersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query({
      query: (params) => ({
        url: "/get/sellers",
        params,
      }),
      providesTags: ["Sellers"],
    }),
    getSellerSearch: build.query({
      query: (params) => ({
        url: "/get/sellers/search",
        params,
      }),
      providesTags: ["Sellers"],
    }),
    getSingleSeller: build.query({
      query: ({ id }) => ({
        url: `/get/seller/${id}`,
      }),
      providesTags: ["Sellers"],
    }),
    updateSellers: build.mutation({
      query: ({ body, _id }) => ({
        url: `/update/seller/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Sellers"],
    }),
    pinSellers: build.mutation({
      query: ({ body, _id }) => ({
        url: `/update/seller/${_id}`,
        method: "PATCH",
        body: {
          pin: !body.pin,
        },
      }),
      invalidatesTags: ["Sellers"],
    }),
    createSeller: build.mutation({
      query: (body) => ({
        url: `/create/seller`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sellers"],
    }),
  }),
});

export const {
  useGetSellersQuery,
  useGetSingleSellerQuery,
  useUpdateSellersMutation,
  usePinSellersMutation,
  useCreateSellerMutation,
  useGetSellerSearchQuery
} = sellersApi;
