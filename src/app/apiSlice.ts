import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://speed-type-backend.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }: { getState: () => any }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult: any = await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );
    console.log(refreshResult);

    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["Texts", "Results", "Users"],
});
