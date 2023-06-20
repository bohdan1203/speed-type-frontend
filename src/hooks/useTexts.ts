import { useSelector } from "react-redux";

import {
  useGetTextsQuery,
  useAddTextMutation,
  useDeleteTextMutation,
} from "../features/textsApiSlice";

import {
  selectAllTexts,
  selectTextById,
  selectTextIds,
} from "../features/textsApiSlice";

import { Text } from "../interfaces/Text";
import { RootState } from "../app/store";
import { EntityId } from "@reduxjs/toolkit";

function useTexts(textId?: string) {
  const {
    isLoading: getTextsLoading,
    isSuccess: getTextsSuccess,
    isError: getTextsError,
  } = useGetTextsQuery(undefined);

  const [addText, { error: addTextError }] = useAddTextMutation();
  const [deleteText] = useDeleteTextMutation();

  const texts: Text[] = useSelector(selectAllTexts);
  const text: Text | undefined = useSelector((state: RootState) =>
    selectTextById(state, textId ?? "")
  );
  const textIds: EntityId[] = useSelector(selectTextIds);

  return {
    getTextsLoading,
    getTextsSuccess,
    getTextsError,
    addText,
    addTextError,
    deleteText,
    texts,
    text,
    textIds,
  };
}

export default useTexts;
