import { Col } from "react-bootstrap";

interface ResultCardProps {
  title: string;
  value: number;
  unit: string;
}

function ResultCard({ title, value, unit }: ResultCardProps) {
  return (
    <Col
      sm={4}
      className="p-2 d-flex gap-4 justify-content-center align-items-center"
    >
      <div className="fw-bold fs-6 mb-0">
        {title.split(" ").map((word, i) => (
          <p className="mb-0" key={i}>
            {word}
          </p>
        ))}
      </div>
      <p className="display-6 mb-0 text-end">
        {value}
        {unit}
      </p>
    </Col>
  );
}

export default ResultCard;
