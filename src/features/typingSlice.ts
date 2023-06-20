import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Text } from "../interfaces/Text";

import { RootState } from "../app/store";

interface TypingState {
  textId: string;
  text: string;
  chars: string[];
  isTyping: boolean;
  currentIndex: number;
  typed: string;
  typedWithMistakes: string[];
  startedAt: number | null;
  finishedAt: number | null;
  selectedTextId: string | null;
}

const initialState: TypingState = {
  textId: "",
  text: "",
  chars: [],
  isTyping: false,
  currentIndex: 0,
  typed: "",
  typedWithMistakes: [],
  startedAt: null,
  finishedAt: null,
  selectedTextId: null,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setText(_, { payload }: PayloadAction<Text>) {
      return {
        ...initialState,
        textId: payload._id,
        text: payload.content,
        chars: payload.content.split(""),
      };
    },
    selectText(state, { payload }) {
      state.selectedTextId = payload;
    },
    type(state, { payload }) {
      if (payload.timestamp) {
        state.startedAt = payload.timestamp;
      }

      state.isTyping = true;
      state.typed = payload.typedText;
      state.currentIndex = payload.typedText.length;
      payload.lastChar && state.typedWithMistakes.push(payload.lastChar);
    },
    finishTyping(state, { payload }) {
      state.isTyping = false;
      state.finishedAt = payload.timestamp;
    },
    resetTyping() {
      return initialState;
    },
  },
});

export const getTypingState = (state: RootState) => state.typing;

export const { setText, selectText, type, finishTyping, resetTyping } =
  typingSlice.actions;
export default typingSlice.reducer;
