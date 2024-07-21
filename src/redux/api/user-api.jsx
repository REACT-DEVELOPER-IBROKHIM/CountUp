import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body)=> ({
        url: "/admin/sign-in",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    })
  })
})

export const {useSignInMutation} = userApi