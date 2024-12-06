import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSilce";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_UPI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accesstoken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getQuestions: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `get-all-questions?page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    submitTest: builder.mutation({
      query: (data) => ({
        url: "submit-test",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useRefreshTokenQuery,
  useLoadUserQuery,
  useGetQuestionsQuery,
  useSubmitTestMutation,
} = apiSlice;
