import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Container } from "react-bootstrap";

import useAuth from "../hooks/useAuth";
import useResults from "../hooks/useResults";

import { Result } from "../interfaces/Result";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Progress() {
  const { currentUser } = useAuth();
  const { userResults } = useResults(currentUser?.userId as string);

  console.log(userResults);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "This is your typing progress!",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = userResults?.map((_: Result, index: number) => index + 1);

  const data = {
    labels,
    datasets: [
      {
        label: "Words per minute",
        data: userResults?.map((result: Result) => result.wordsPerMinute),
        borderColor: "rgba(0, 123, 255, 0.5)",
        backgroundColor: "rgba(0, 123, 255, 1)",
      },
    ],
  };

  return (
    <Container className="py-4">
      <Line options={options} data={data} />
    </Container>
  );
}

export default Progress;
