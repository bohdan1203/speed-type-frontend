import { Container } from "react-bootstrap";
import useTyping from "../hooks/useTyping";

interface CurrentResultPanelProps {
  mistakes: number;
  currentAccuracy: number;
  currentSpeed: number;
}

function CurrentResultPanel({
  mistakes,
  currentAccuracy,
  currentSpeed,
}: CurrentResultPanelProps) {
  const { startedAt, finishedAt, typedWithMistakes } = useTyping();

  return (
    <Container className="">
      {startedAt ? (
        <>
          <h1 className="text-center mb-4">
            {finishedAt ? "Final Result" : "Current Performance"}
          </h1>

          <div className="text-center mb-4">
            <h4>Speed</h4>
            <p className="display-6">
              {typedWithMistakes.length === 1
                ? "Keep typing"
                : currentSpeed + " WPM"}
            </p>
          </div>

          <div className="text-center mb-4">
            <h4>Accuracy</h4>
            <p className="display-6">{currentAccuracy}%</p>
          </div>

          <div className="text-center mb-4">
            <h4>Mistakes</h4>
            <p className="display-6">{mistakes}</p>
          </div>
        </>
      ) : (
        <h1 className="text-center">Start typing</h1>
      )}
    </Container>
  );
}

export default CurrentResultPanel;
