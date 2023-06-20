import { Alert } from "react-bootstrap";
import { MdInfo } from "react-icons/md";

interface SignUpInputAlertProps {
  id: string;
  alert: string;
}

function SignUpInputAlert({ id, alert }: SignUpInputAlertProps) {
  return (
    <Alert variant="primary" id={id}>
      <MdInfo size={20} className="me-1" />
      {alert}
    </Alert>
  );
}

export default SignUpInputAlert;
