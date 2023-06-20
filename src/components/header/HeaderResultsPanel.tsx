import { useMemo } from "react";
import { Container, Row } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import useResults from "../../hooks/useResults";

import ResultCard from "./ResultCard";

function HeaderResultsPanel() {
  const { currentUser } = useAuth();
  const { userResults } = useResults(currentUser?.userId as string);

  const memoizedAverageAccuracy = useMemo(() => {
    if (userResults && userResults.length > 0) {
      return Number(
        (
          userResults
            ?.map((result) => result.accuracy)
            .reduce((acc, cur) => acc + cur, 0) / userResults?.length
        ).toFixed(2)
      );
    } else return 0;
  }, [userResults]);

  const memoizedAverageSpeed = useMemo(() => {
    if (userResults && userResults.length > 0) {
      return Number(
        (
          userResults
            ?.map((result) => result.wordsPerMinute)
            .reduce((acc, cur) => acc + cur, 0) / userResults?.length
        ).toFixed(2)
      );
    } else return 0;
  }, [userResults]);

  const memoizedBestSpeed = useMemo(() => {
    if (userResults && userResults.length > 0) {
      return Math.max(...userResults.map((result) => result.wordsPerMinute));
    } else return 0;
  }, [userResults]);

  return (
    <Container className="mt-2">
      <Row>
        <ResultCard
          title="Average Accuracy"
          value={memoizedAverageAccuracy}
          unit="%"
        />
        <ResultCard
          title="Average Speed"
          value={memoizedAverageSpeed}
          unit=" WPM"
        />
        <ResultCard title="Best Speed" value={memoizedBestSpeed} unit=" WPM" />
      </Row>
    </Container>
  );
}

export default HeaderResultsPanel;
