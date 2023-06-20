import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../app/apiSlice";

import { RootState } from "../app/store";

import { Text } from "../interfaces/Text";

import { ErrorResponse } from "../interfaces/ErrorResponse";

const textsAdapter = createEntityAdapter({
  selectId: (text: Text) => text._id,
});
const initialState = textsAdapter.getInitialState();

const textsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTexts: builder.query({
      query: () => "/texts",
      transformResponse: (response: { texts: Text[] }) => {
        return textsAdapter.setAll(initialState, response?.texts);
      },
      providesTags: ["Texts"],
    }),

    addText: builder.mutation({
      query: (newText) => ({
        url: "/texts",
        method: "POST",
        body: newText,
      }),
      transformErrorResponse: (response: ErrorResponse) => response.data.error,
      invalidatesTags: ["Texts", "Results"],
    }),

    deleteText: builder.mutation({
      query: ({ textId }: { textId: string }) => ({
        url: `/texts/${textId}`,
        method: "DELETE",
        body: textId,
      }),
      invalidatesTags: ["Texts"],
    }),
  }),
});

export const { useGetTextsQuery, useAddTextMutation, useDeleteTextMutation } =
  textsApiSlice;

export const selectTextsResult =
  textsApiSlice.endpoints.getTexts.select(undefined);

// Creates memoized selector
const selectTextsData = createSelector(
  selectTextsResult,
  (textsResult) => textsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTexts,
  selectById: selectTextById,
  selectIds: selectTextIds,
  // Pass in a selector that returns the texts slice of state
} = textsAdapter.getSelectors(
  (state: RootState) => selectTextsData(state) ?? initialState
);
