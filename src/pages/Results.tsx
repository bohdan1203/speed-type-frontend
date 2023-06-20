import { Link } from "react-router-dom";
import { Alert, Container, Table } from "react-bootstrap";

import useAuth from "../hooks/useAuth";
import useResults from "../hooks/useResults";

import { Result } from "../interfaces/Result";

function Results() {
  const { currentUser } = useAuth();

  const { userResults, resultsLoading, resultsSuccess, resultsError } =
    useResults(currentUser?.userId as string);

  return (
    <Container className="my-4">
      {resultsLoading && (
        <Alert variant="primary">Loading your results...</Alert>
      )}

      {(resultsError as string) && (
        <Alert variant="danger">{resultsError as string}</Alert>
      )}

      {resultsSuccess && userResults && userResults.length === 0 && (
        <Alert variant="warning">You don't have any results yet.</Alert>
      )}

      {resultsSuccess && userResults && userResults.length > 0 && (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Text</th>
              <th>Accuracy</th>
              <th>Speed</th>
            </tr>
          </thead>
          <tbody>
            {userResults.map((result: Result) => {
              return (
                <tr key={result._id}>
                  <td>{new Date(result.createdAt).toLocaleString()}</td>
                  <td>
                    {result.textContent ? (
                      <Link
                        to={`/texts/${result.textId}`}
                        className="text-decoration-none text-reset"
                      >
                        <p className="text-justify m-1">{result.textContent}</p>
                      </Link>
                    ) : (
                      "No text content available."
                    )}
                  </td>
                  <td>{result.accuracy}</td>
                  <td>{result.wordsPerMinute}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Results;
