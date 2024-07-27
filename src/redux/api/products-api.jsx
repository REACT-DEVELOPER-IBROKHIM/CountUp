import { api } from "./index";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: "/get/products",
        params
      }),
      providesTags: ["Products"],
    }),
    getSingleProduct: build.query({
      query: ({ id }) => ({
        url: `/get/customer/${id}`,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;
