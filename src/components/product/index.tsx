import { HTMLMotionProps } from "framer-motion";
import ProductsData from "../../interface/products";

import { Container } from "./styles";

interface ProductProps extends HTMLMotionProps<"button"> {
  data: ProductsData;
}

const Product: React.FC<ProductProps> = ({ data, ...props }) => {
  return (
    <Container {...props}>
      <section className="info">
        <h1>{data.name}........</h1>
      </section>

      <section className="price">
        <h2>{data.priceFormated}</h2>
      </section>
    </Container>
  );
};

export default Product;
