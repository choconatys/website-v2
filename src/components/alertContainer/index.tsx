import { AlertMessage } from "../../prodivers/alert";
import AlertBox from "../alertBox";
import { Container } from "./styles";

interface AlertContainerProps {
  alerts?: AlertMessage[];
}

const AlertContainer: React.FC<AlertContainerProps> = ({ alerts, children, ...props }) => {
  

  return (
    <Container>
      {alerts?.map((alert) => (
        <AlertBox key={alert.id} id={alert.id} severity={alert.severity}>{alert.message}</AlertBox>
      ))}
    </Container>
  );
}

export default AlertContainer;
