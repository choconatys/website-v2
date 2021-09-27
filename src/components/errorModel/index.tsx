import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Container, Background } from "./styles";

export interface ErrorModelProps {
    type: "internalError" | "notFound";
}

const ErrorModel: React.FC<ErrorModelProps> = ({ type, children }) => {
    const { inView, entry, ref } = useInView();
    const animationControl = useAnimation();

    if (inView) {
        animationControl.start({
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.3,
            restSpeed: 4,
          }
        });
    }


    return (
        <Container 
            ref={ref} 
            initial={{ y: 20, opacity: 0 }}
            animate={animationControl}
        >
            <Background type={type} />

            <section className="info">
                {type === "internalError" ? (
                    <>
                        <h1>Erro interno no servidor!</h1>
            
                        <p>Entre em contato com eu@choconatys.com.br</p>
                    </>
                ) : (
                    <>
                        <h1>Ops... Que pena :(</h1>
                    
                        <p>Atualmente não temos nenhum docinho disponivel!</p>
                    </>
                )}
            </section>
        </Container>
    );
}

export default ErrorModel;
