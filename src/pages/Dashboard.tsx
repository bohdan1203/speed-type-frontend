import { KeyboardEvent, useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";

import { calculateRoundedFloat } from "../util/calculateRoundedFloat";

import { Text } from "../interfaces/Text";
import { NewResultResponse } from "../interfaces/Responses";

import TypingInputField from "../components/TypingInputField";
import CurrentResultPanel from "../components/CurrentResultPanel";

import useDispatchWithTypes from "../hooks/useDispatchWithTypes";
import useAuth from "../hooks/useAuth";
import useTexts from "../hooks/useTexts";
import useTyping from "../hooks/useTyping";
import useCurrentPerformance from "../hooks/useCurrentPerformance";
import useResults from "../hooks/useResults";

function Dashboard() {
  const [showResultNotification, setShowResultNotification] = useState(false);
  const [resultNotification, setResultNotification] = useState({
    title: "",
    text: "",
    background: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatchWithTypes();
  const { currentUser } = useAuth();
  const { getTextsLoading, getTextsSuccess, getTextsError, texts } = useTexts();
  const { addResult } = useResults();

  const {
    textId,
    text,
    isTyping,
    typed,
    typedWithMistakes,
    startedAt,
    finishedAt,
    setText,
    finishTyping,
    selectedTextId,
    resetTyping,
  } = useTyping();

  const {
    mistakes,
    setMistakes,
    currentAccuracy,
    setCurrentAccuracy,
    currentSpeed,
    setCurrentSpeed,
    resetCurrentPerformance,
  } = useCurrentPerformance();

  const selectedTextIdRef = useRef(selectedTextId);
  selectedTextIdRef.current = selectedTextId;

  const getRandomText = useCallback(
    (texts: Text[], textId = selectedTextIdRef.current) => {
      if (texts && texts.length > 0) {
        if (typeof textId === "string") {
          const selectedText = texts.find(
            (text) => text._id === textId
          ) as Text;

          dispatch(setText(selectedText));
        } else {
          const randomIndex = Math.floor(Math.random() * texts.length);
          const randomText = texts[randomIndex];
          dispatch(setText(randomText));
        }

        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    },
    [setText, dispatch]
  );

  useEffect(() => {
    if (texts && !finishedAt) {
      getRandomText(texts);
    }
  }, [texts, finishedAt, getRandomText]);

  type HandleKeyUp = () => void;

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (e.keyCode === 27 && inputRef.current) {
        inputRef.current.disabled = false;
        getRandomText(texts);
        resetCurrentPerformance();
      }
    }

    document.addEventListener("keyup", handleKeyUp as HandleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp as HandleKeyUp);
    };
  });

  useEffect(() => {
    if (typed === text && inputRef.current && isTyping) {
      inputRef.current.disabled = true;
      dispatch(finishTyping({ timestamp: Date.now() }));
    }
  }, [typed, text, isTyping, finishTyping, dispatch]);

  useEffect(() => {
    if (startedAt && finishedAt && !isTyping && currentUser?.userId) {
      const textLength = text.length;
      const typingDuration = finishedAt - startedAt;
      const SPM = calculateRoundedFloat(textLength / typingDuration);
      const WPM = calculateRoundedFloat(textLength / typingDuration / 5);

      const accuracy = Number(
        (
          ((textLength - Math.min(mistakes, textLength)) / textLength) *
          100
        ).toFixed(2)
      );

      setCurrentAccuracy(accuracy);
      setCurrentSpeed(WPM);

      addResult({
        userId: currentUser?.userId,
        textId,
        textContent: text,
        accuracy,
        symbolsPerMinute: SPM,
        wordsPerMinute: WPM,
      })
        .unwrap()
        .then((response) => {
          const resultResponse = response as NewResultResponse;

          setShowResultNotification(true);

          if (resultResponse?.isNewBestUserSpeedResult) {
            setResultNotification({
              title: "Congratulations!",
              text: "It's your best result so far!",
              background: "bg-success",
            });
          } else {
            setResultNotification({
              title: "Good job!",
              text: "Check Results and Progress pages to see how good you are!",
              background: "bg-primary",
            });
          }

          setTimeout(() => {
            setShowResultNotification(false);
          }, 5000);
        });
    }
  }, [
    currentUser?.userId,
    dispatch,
    finishedAt,
    isTyping,
    mistakes,
    startedAt,
    text,
    textId,
    typedWithMistakes,
    setCurrentAccuracy,
    setCurrentSpeed,
    addResult,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetTyping());
    };
  }, [resetTyping, dispatch]);

  return (
    <Container className="py-4 d-flex flex-column align-items-center">
      {getTextsLoading && <Spinner variant="primary" />}

      {getTextsError && <Alert variant="danger">Failed to fetch texts</Alert>}

      {getTextsSuccess && (
        <>
          {texts.length > 0 ? (
            <Row>
              <Col sm={9}>
                <TypingInputField
                  setMistakes={setMistakes}
                  inputRef={inputRef}
                />
              </Col>
              <Col sm={3} className="d-flex flex-column gap-2">
                <Button variant="primary" onClick={() => getRandomText(texts)}>
                  Get Random Text (or press Esc)
                </Button>
                <CurrentResultPanel
                  mistakes={mistakes}
                  currentAccuracy={currentAccuracy}
                  currentSpeed={currentSpeed}
                />
              </Col>
            </Row>
          ) : (
            <Alert variant="warning" className="text-center">
              No texts found. Feel free to go to <Link to="/texts">Texts</Link>{" "}
              page and add your favorite texts to exercise your typing speed!
            </Alert>
          )}
        </>
      )}

      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          show={showResultNotification}
          onClose={() => setShowResultNotification(false)}
          delay={5000}
          autohide
        >
          <Toast.Header
            className={`text-white ${resultNotification.background}`}
          >
            <strong className="me-auto">{resultNotification.title}</strong>
          </Toast.Header>
          <Toast.Body className="bg-light">
            {resultNotification.text}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Dashboard;
