import { AlertProps } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAlert } from "../../prodivers/alert";
import { Container } from "./styles";

interface AlertBoxProps extends AlertProps {}

const AlertBox: React.FC<AlertBoxProps> = ({ id, severity, children }) => {
    const { inView, entry, ref } = useInView();
    const animationControl = useAnimation();

    const { removeAlert } = useAlert();

    if (inView) {
        animationControl.start({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1,
                restSpeed: 4,
            }
        });
    } else {
        animationControl.start({
            opacity: 0,
            x: 20,
            transition: {
                delay: 0.1,
                restSpeed: 4,
            }
        }); 
    }

    return (
        <Container
            ref={ref} 
            initial={{ x: 20, opacity: 0 }}
            animate={animationControl}
        >
            <Alert severity={severity} onClose={() => removeAlert(id)}>
                {children}
            </Alert>
        </Container>
    );
}

export default AlertBox;
