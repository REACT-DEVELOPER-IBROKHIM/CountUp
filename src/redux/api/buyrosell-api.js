import { api } from "./index";

export const buyorsellApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBuyorsell: build.query({
      query: (params) => ({
        url: "/get/buy-or-sell",
        params,
      }),
      providesTags: ["Buyorsell"],
    }),
    createBuyorsellInput: build.mutation({
      query: (body) => ({
        url: `/create/buy-or-sell/input`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Buyorsell", "Products", "Sellers"],
    }),
  }),
});

export const {
    useCreateBuyorsellInputMutation,
    useGetBuyorsellQuery
} = buyorsellApi;
