import { useSelector } from "react-redux";
import {
  getTypingState,
  setText,
  selectText,
  type,
  finishTyping,
  resetTyping,
} from "../features/typingSlice";

function useTyping() {
  const {
    textId,
    text,
    chars,
    isTyping,
    currentIndex,
    typed,
    typedWithMistakes,
    startedAt,
    finishedAt,
    selectedTextId,
  } = useSelector(getTypingState);

  return {
    textId,
    text,
    chars,
    isTyping,
    currentIndex,
    typed,
    typedWithMistakes,
    startedAt,
    finishedAt,
    selectedTextId,
    setText,
    selectText,
    type,
    finishTyping,
    resetTyping,
  };
}

export default useTyping;
