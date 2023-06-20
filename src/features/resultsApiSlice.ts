import { apiSlice } from "../app/apiSlice";

import { Result } from "../interfaces/Result";
import { AllResultsResponse } from "../interfaces/Responses";
import { ErrorResponse } from "../interfaces/ErrorResponse";

const resultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllResults: builder.query({
      query: () => "/results",
      transformResponse: (response: AllResultsResponse) => response.results,
      providesTags: ["Results", "Users"],
    }),
    getUserResults: builder.query({
      query: (userId: string) => `/results/users/${userId}`,
      transformResponse: (response: { userResults: Result[] }) =>
        response.userResults,
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
      providesTags: ["Results", "Texts"],
    }),
    getTextResults: builder.query({
      query: (textId: string) => `/results/texts/${textId}`,
      transformResponse: (response: { textResults: Result[] }) =>
        response.textResults,
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
      providesTags: ["Results", "Texts"],
    }),
    addResult: builder.mutation({
      query: (result) => ({
        url: "/results",
        method: "POST",
        body: result,
      }),
      invalidatesTags: ["Results", "Texts", "Users"],
    }),
  }),
});

export const {
  useGetAllResultsQuery,
  useGetUserResultsQuery,
  useGetTextResultsQuery,
  useAddResultMutation,
} = resultsApiSlice;
