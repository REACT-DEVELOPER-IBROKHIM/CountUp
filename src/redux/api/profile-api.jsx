import { api } from './index'

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/get/profile"
      }),
      invalidatesTags: ["Profile"]
    })
  })
})

export const { useGetProfileQuery } = profileApi