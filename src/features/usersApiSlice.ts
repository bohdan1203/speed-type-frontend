import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../app/apiSlice";
import { RootState } from "../app/store";

import { User } from "../interfaces/User";
import { ErrorResponse } from "../interfaces/ErrorResponse";

const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.userId,
});

const initialState = usersAdapter.getInitialState();

interface UsersResponse {
  users: User[];
}

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      transformResponse: (response: UsersResponse) => {
        const loadedUsers: User[] = [];

        for (const user of response.users) {
          const transformedUser: User = {
            username: user?.username,
            userId: user?._id as string,
            results: user?.results,
          };

          loadedUsers.push(transformedUser);
        }

        return usersAdapter.setAll(initialState, loadedUsers);
      },
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApiSlice;

export const selectUsersResult =
  usersApiSlice.endpoints.getAllUsers.select(undefined);

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUsersIds,
  // Pass in a selector that returns the userss slice of state
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
);
