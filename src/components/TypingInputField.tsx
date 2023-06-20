import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { Button, FormControl } from "react-bootstrap";

import useDispatchWithTypes from "../hooks/useDispatchWithTypes";
import useTyping from "../hooks/useTyping";
import useLocalStorage from "../hooks/useLocalStorage";

import { getCharWrapperClassNames } from "../util/getCharWrapperClassNames";

import mistakeSound from "../assets/mistake.mp3";

interface TypingInputFieldProps {
  inputRef: RefObject<HTMLInputElement>;
  setMistakes: Dispatch<SetStateAction<number>>;
}

function TypingInputField({ inputRef, setMistakes }: TypingInputFieldProps) {
  const [hasUnfixedMistakes, setHasUnfixedMistakes] = useState(false);

  const mistakeSoundRef = useRef<HTMLAudioElement>(null);
  const { value: soundSignalOnMistake } = useLocalStorage("playMistakeSound");

  const {
    textId,
    text,
    chars,
    isTyping,
    currentIndex,
    typed,
    type,
    finishedAt,
  } = useTyping();

  const dispatch = useDispatchWithTypes();

  useEffect(() => {
    mistakeSoundRef.current?.load();
  }, []);

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    const typedText = e.target.value;
    const lastChar = (e.nativeEvent as InputEvent).data;
    const mistake = lastChar && typedText.slice(-1) !== text[currentIndex];

    setHasUnfixedMistakes(typedText !== text.slice(0, typedText.length));

    if (mistake) {
      soundSignalOnMistake && mistakeSoundRef.current?.play();
      setMistakes((previousMistakes) => previousMistakes + 1);
    }

    if (!isTyping) {
      dispatch(type({ typedText, lastChar, timestamp: Date.now() }));
    } else {
      dispatch(type({ typedText, lastChar }));
    }
  }

  return (
    <>
      <section
        className={`font-monospace fs-3 border rounded disable-select ${
          hasUnfixedMistakes && isTyping
            ? "typing-input-mistakes"
            : finishedAt
            ? "typing-input-finished"
            : "typing-input-no-mistakes"
        }`}
      >
        {chars.map((char, i) => {
          const classNames = getCharWrapperClassNames(
            i,
            currentIndex,
            typed,
            text
          );
          return (
            <span className={`p-1 ${classNames}`} key={`${char}-${i}`}>
              {char}
            </span>
          );
        })}
      </section>

      <FormControl
        type="text"
        className="mt-4"
        placeholder="Type here"
        ref={inputRef}
        onInput={inputHandler}
        onPaste={(e) => e.preventDefault()} // makes impossible to paste
      />

      <Button as={Link as any} to={`/texts/${textId}`} className="my-4">
        Go to This Text Page
      </Button>

      <audio ref={mistakeSoundRef} src={mistakeSound} />
    </>
  );
}

export default TypingInputField;
