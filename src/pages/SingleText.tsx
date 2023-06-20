import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Container, Table } from "react-bootstrap";

import useTexts from "../hooks/useTexts";

import useAuth from "../hooks/useAuth";
import useResults from "../hooks/useResults";
import useDispatchWithTypes from "../hooks/useDispatchWithTypes";
import useUsers from "../hooks/useUsers";
import useTyping from "../hooks/useTyping";

import { User } from "../interfaces/User";

function SingleText() {
  const textId: string | undefined = useParams().textId;

  const { text } = useTexts(textId);
  const { users, usersLoading } = useUsers();
  const { selectText } = useTyping();
  const { currentUser } = useAuth();

  const { textResults, refetchTextResults } = useResults(textId);

  const navigate = useNavigate();
  const dispatch = useDispatchWithTypes();

  const top10TextResults = useMemo(() => {
    if (textResults) {
      return [...textResults]
        .sort((a, b) => {
          return b.wordsPerMinute - a.wordsPerMinute;
        })
        .slice(0, 10);
    }
  }, [textResults]);

  useEffect(() => {
    refetchTextResults();
  }, [refetchTextResults]);

  function exerciseText() {
    dispatch(selectText(textId));
    navigate("/dashboard");
  }

  return (
    <Container className="py-4">
      <Button variant="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <p className="fs-5">{text?.content}</p>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-6">
          Added by{" "}
          <Badge bg="secondary">
            {usersLoading
              ? "Loading..."
              : users.find((user: User) => user.userId === text?.createdBy)
                  ?.username || "Deleted User"}
          </Badge>
        </p>
        <p className="fs-6">Length: {text?.content?.length}</p>
      </div>

      <Button onClick={() => exerciseText()}>Exercise This Text</Button>

      {text && text?.results.length > 0 && (
        <Table striped bordered responsive>
          <caption className="fs-4">Top 10 Results for This Text</caption>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Date / Time</th>
              <th>User</th>
              <th>Accuracy</th>
              <th>Speed</th>
            </tr>
          </thead>
          <tbody>
            {top10TextResults &&
              top10TextResults.map((result, index) => {
                return (
                  <tr key={result._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(result.createdAt).toLocaleString()}</td>
                    <td>
                      {users.find((user: User) => user.userId === result.userId)
                        ?.username || "Deleted User"}
                    </td>
                    <td>{result.accuracy}</td>
                    <td>{result.wordsPerMinute}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}

      <Table striped bordered responsive>
        <caption className="fs-4">Your Results for This Text</caption>
        <thead>
          <tr>
            <th>Attempt</th>
            <th>Date / Time</th>
            <th>Accuracy</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {textResults &&
            textResults
              .filter((result) => result.userId === currentUser?.userId)
              .map((result, index) => {
                return (
                  <tr key={result._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(result.createdAt).toLocaleString()}</td>
                    <td>{result.accuracy}</td>
                    <td>{result.wordsPerMinute}</td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </Container>
  );
}

export default SingleText;
