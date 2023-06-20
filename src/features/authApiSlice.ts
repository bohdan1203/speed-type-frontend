import { apiSlice } from "../app/apiSlice";

import {
  SignUpFormInputs,
  LogInFormInputs,
  LogOutData,
  UpdateProfileFormInputs,
} from "../interfaces/AuthFormsData";

import { ErrorResponse } from "../interfaces/ErrorResponse";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.query({
      query: () => "auth/refresh",
    }),

    signUp: builder.mutation({
      query: (userData: SignUpFormInputs) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
    }),

    logIn: builder.mutation({
      query: (userData: LogInFormInputs) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
    }),

    logOut: builder.mutation({
      query: ({ userId }: LogOutData) => ({
        url: `/auth/logout/${userId}`,
        method: "DELETE",
        body: userId,
      }),
    }),

    updateProfile: builder.mutation({
      query: (userData: {
        userId: string;
        updates: UpdateProfileFormInputs;
      }) => ({
        url: `/auth/update/${userData.userId}`,
        method: "PATCH",
        body: userData.updates,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
    }),
  }),
});

export const {
  useRefreshQuery,
  useSignUpMutation,
  useLogInMutation,
  useLogOutMutation,
  useUpdateProfileMutation,
} = authApiSlice;
