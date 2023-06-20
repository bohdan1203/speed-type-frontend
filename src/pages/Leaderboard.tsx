import { useMemo } from "react";
import { Container, Table } from "react-bootstrap";
import useResults from "../hooks/useResults";
import useUsers from "../hooks/useUsers";
import { User } from "../interfaces/User";
import { Result } from "../interfaces/Result";

function Leaderboard() {
  const { allResults } = useResults();
  const { users } = useUsers();

  const memoizedUsersWithResults = useMemo(() => {
    if (allResults && users) {
      return users.map((user: User) => {
        const userResults = allResults.filter((result: Result) =>
          user.results.includes(result._id)
        );

        return { ...user, results: userResults };
      });
    } else return [];
  }, [allResults, users]);

  console.log(memoizedUsersWithResults);

  const mostActiveUsers = useMemo(() => {
    if (memoizedUsersWithResults) {
      return [...memoizedUsersWithResults]
        .sort((a, b) => b.results.length - a.results.length)
        .slice(0, 10)
        .map((user) => ({
          userId: user.userId,
          username: user.username,
          exercisesCompleted: user.results.length,
        }));
    } else return [];
  }, [memoizedUsersWithResults]);

  const mostAccurateUsers = useMemo(() => {
    if (memoizedUsersWithResults) {
      return [...memoizedUsersWithResults]
        .sort(
          (a, b) =>
            b.results.reduce((acc, cur) => acc + cur.accuracy, 0) /
              b.results.length -
            a.results.reduce((acc, cur) => acc + cur.accuracy, 0) /
              a.results.length
        )
        .slice(0, 10)
        .map((user) => ({
          userId: user.userId,
          username: user.username,
          accuracy: (
            user.results.reduce((acc, cur) => acc + cur.accuracy, 0) /
            user.results.length
          ).toFixed(2),
        }));
    } else return [];
  }, [memoizedUsersWithResults]);

  const fastestUsers = useMemo(() => {
    if (memoizedUsersWithResults) {
      return [...memoizedUsersWithResults]
        .sort(
          (a, b) =>
            b.results.reduce((acc, cur) => acc + cur.wordsPerMinute, 0) /
              b.results.length -
            a.results.reduce((acc, cur) => acc + cur.wordsPerMinute, 0) /
              a.results.length
        )
        .slice(0, 10)
        .map((user) => ({
          userId: user.userId,
          username: user.username,
          speed: (
            user.results.reduce((acc, cur) => acc + cur.wordsPerMinute, 0) /
            user.results.length
          ).toFixed(2),
        }));
    } else return [];
  }, [memoizedUsersWithResults]);

  const bestResultsEver = useMemo(() => {
    if (allResults) {
      return [...allResults]
        .sort((a, b) => b.wordsPerMinute - a.wordsPerMinute)
        .slice(0, 10)
        .map((result) => ({
          resultId: result._id,
          username: users.find((user) => user.results.includes(result._id))
            ?.username,
          speed: result.wordsPerMinute,
        }));
    } else return [];
  }, [allResults, users]);

  return (
    <Container>
      <Table striped bordered responsive>
        <caption className="fs-4">Top 10 Most Active Users</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>User</th>
            <th>Exercises Completed</th>
          </tr>
        </thead>
        <tbody>
          {mostActiveUsers &&
            mostActiveUsers.map((user, index) => {
              return (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.exercisesCompleted}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Table striped bordered responsive>
        <caption className="fs-4">Top 10 Most Accurate Users</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>User</th>
            <th>Average Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {mostAccurateUsers &&
            mostAccurateUsers.map((user, index) => {
              return (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.accuracy}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Table striped bordered responsive>
        <caption className="fs-4">Top 10 Fastest Users</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>User</th>
            <th>Average Speed</th>
          </tr>
        </thead>
        <tbody>
          {fastestUsers &&
            fastestUsers.map((user, index) => {
              return (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.speed}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Table striped bordered responsive>
        <caption className="fs-4">Top 10 Best Results Ever</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>User</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {bestResultsEver &&
            bestResultsEver.map((result, index) => {
              return (
                <tr key={result.resultId}>
                  <td>{index + 1}</td>
                  <td>{result.username}</td>
                  <td>{result.speed}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Leaderboard;
