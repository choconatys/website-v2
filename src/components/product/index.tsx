import { HTMLMotionProps, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductsData from "../../interface/products";

import { Container } from "./styles";

interface ProductProps extends HTMLMotionProps<"button">  {
    data: ProductsData;
}

const Product: React.FC<ProductProps> = ({ data, ...props }) => {
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
            {...props}
        >
            <section className="info">
                <h1>{data.name}........</h1>
            </section>

            <section className="price">
                <h2>R$ {data.price}</h2>
            </section>
        </Container>
    );
}

export default Product;
