import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { AiFillInstagram } from "react-icons/ai";

import { Container, ButtonSocial } from "./styles";

const CardAboutUs: React.FC = ({ ...props }) => {
  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  if (inView) {
    animationControl.start({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        restSpeed: 4,
      },
    });
  }

  return (
    <Container
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={animationControl}
    >
      <section className="about">
        <h1>Sobre Nós</h1>

        <h2>
          Bem vindo a Choconatys, procurando sempre trazer docura facilidade e
          muito bem mais do que você normalmente ta equipado acostumado!
        </h2>

        <div className="controls">
          <ButtonSocial
            href="https://www.instagram.com/choconatys/"
            target="blank"
          >
            <AiFillInstagram /> Instagram
          </ButtonSocial>
        </div>
      </section>
    </Container>
  );
};

export default CardAboutUs;
