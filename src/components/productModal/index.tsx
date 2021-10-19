import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import ProductsData from "../../interface/products";
import {
  ModalButtonsWrapper,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalInfo,
  ModalPhoto,
  ModalWrapper,
} from "./styles";

import Button from "../button";
import balance from "../../services/balance";
import { useAlert } from "../../providers/alert";
import { useCart } from "react-use-cart";

interface ProductModalProps {
  product: ProductsData;
}

const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [quantity, setQuantity] = useState(0);

  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  const { addItem } = useCart();
  const { addAlert } = useAlert();

  useEffect(() => {
    setQuantity(0);
    setIsVisible(!!product);
  }, [product]);

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

  const addInCart = () => {
    let productToRequest = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };

    addItem(productToRequest, quantity);
    addAlert({
      severity: "success",
      message: "Item adicionado no carrinho!",
    });

    setIsVisible(false);
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {isVisible && (
        <ModalWrapper>
          <ModalContent
            ref={ref}
            initial={{ y: 20, opacity: 0 }}
            animate={animationControl}
            exit={{ opacity: 0 }}
          >
            <ModalCloseButton
              onClick={() => {
                setIsVisible(false);
                document.getElementsByTagName("body")[0].style.overflowY =
                  "scroll";
              }}
            >
              <RiCloseFill />
            </ModalCloseButton>

            <section className="photoWrapper">
              <ModalPhoto src={`${product.photo}`} alt="Photo" />
            </section>

            <ModalInfo>
              <header>
                <h2>{product.name}</h2>
              </header>

              <ModalDescription>
                <p>{product.description}</p>

                <div className="price">
                  <span>{product.priceFormated}</span>
                </div>
              </ModalDescription>
            </ModalInfo>

            <ModalButtonsWrapper>
              <div className="quantityWrapper">
                <button onClick={() => decrement()} className="quantityButton">
                  <HiMinusSm />
                </button>
                <span>{quantity}</span>
                <button onClick={() => increment()} className="quantityButton">
                  <HiPlus />
                </button>
              </div>

              <Button disabled={quantity === 0} onClick={() => addInCart()}>
                ADICIONAR
                <span className="leftSpacing">
                  {quantity === 0
                    ? product.priceFormated
                    : balance(quantity * product.price)}
                </span>
              </Button>
            </ModalButtonsWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default ProductModal;
