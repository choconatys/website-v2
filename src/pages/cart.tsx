import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import Head from "next/head";

import Header from "../components/header";
import Button from "../components/button";

import { useCart } from "react-use-cart";

import { Container, Content, HeaderContent, ItemCart, Items, ModalButtonsWrapper } from "../styles/pages/cart";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";
import Footer from "../components/footer";

const Cart: React.FC = () => {
    const { inView, entry, ref } = useInView();
    const animationControl = useAnimation();

    const { items, updateItemQuantity } = useCart();
    const { addAlert } = useAlert();

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

    const increment = (item) => {
        updateItemQuantity(item.id, item.quantity + 1);
    }
    
    const decrement = (item) => {
        if (item.quantity > 0) {
            if (item.quantity == 1) {
                addAlert({
                    severity: "info",
                    message: "Produto removido do carrinho!",
                });
            }
            updateItemQuantity(item.id, item.quantity - 1);
        }
    }

    return(
        <>
            <Head>
                <title>Choconatys | Carrinho</title>
            </Head>

            <Container
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >        
                <Header />

                <Content>
                    <motion.section
                        ref={ref}
                        initial={{ y: 20, opacity: 0 }}
                        animate={animationControl}
                        exit={{ opacity: 0 }}
                    >
                        {items.length <= 0 ? <ErrorModel title="Ops..." subTitle="Nenhum item no carrinho encontrado!" type="notFound" /> : (
                           <>
                                <HeaderContent>
                                    <h1>Carrinho</h1>
                                </HeaderContent>

                                <Items>
                                    {items.map((item) => (
                                        <ItemCart
                                            key={item.id}
                                            ref={ref} 
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={animationControl}
                                        >
                                            <div className="info">
                                                <h1>{item.name}</h1>
                                                <p>{item.description}</p>
                                            </div>

                                            <ModalButtonsWrapper>
                                                <div className="quantityWrapper">
                                                <button
                                                    onClick={() => decrement(item)}
                                                    className="quantityButton"
                                                >
                                                    <HiMinusSm />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => increment(item)}
                                                    className="quantityButton"
                                                >
                                                    <HiPlus />
                                                </button>
                                                </div>
                                            </ModalButtonsWrapper>
                                        </ItemCart>
                                    ))}
                                </Items>
                           </> 
                        )}

                    </motion.section>
                </Content>

                <Footer style={{ marginTop: "20rem" }} />
            </Container>
        </>
    );
}

export default Cart;
