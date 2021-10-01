import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import Head from "next/head";

import Header from "../components/header";
import Button from "../components/button";

import { useCart } from "react-use-cart";

import {
  Container,
  Content,
  HeaderContent,
  ItemCart,
  Items,
  ModalButtonsWrapper,
  FinishOrder,
} from "../styles/pages/cart";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";
import balance from "../services/balance";
import { useAuth } from "../prodivers/auth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { api } from "../services/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";

const Cart: React.FC = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  const { logout } = useAuth();
  const { items, removeItem, cartTotal, updateItemQuantity } = useCart();
  const router = useRouter();
  const { addAlert } = useAlert();

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

  const makeId = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.toUpperCase();
  };

  const finishOrder = async () => {
    setLoading(true);
    if (!props.isAuth) {
      addAlert({
        severity: "error",
        message: "Você precisa estar logado!",
      });
    } else {
      const code = makeId(8);

      items.map(async (item) => {
        await api
          .post(`/requests/${item.id}`, {
            quantity: item.quantity,
            code,
          })
          .then(async () => {
            await Promise.all(
              items.map((item: any) => {
                removeItem(item.id);
              })
            ).then(() => {
              addAlert({
                severity: "success",
                message: "Pedido concluído! \n Redirecionando...",
              });

              setTimeout(() => {
                router.push("/");
              }, 1000);
            });
          })
          .catch((error) => {
            if (error.message == "Request failed with status code 401") {
              logout();
              router.push("/login");
              return;
            }

            addAlert({
              severity: "error",
              message: "Verifique os itens novamente!",
            });
          })
          .finally(() => setLoading(false));
      });
    }
  };

  const increment = (item) => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

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
  };

  return (
    <>
      <Head>
        <title>Choconatys | Carrinho</title>
      </Head>

      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header isAuthenticated={props.isAuth} />

        <Content>
          <motion.section
            ref={ref}
            initial={{ y: 20, opacity: 0 }}
            animate={animationControl}
            exit={{ opacity: 0 }}
          >
            {items.length <= 0 ? (
              <ErrorModel
                title="Ops..."
                subTitle="Nenhum item no carrinho encontrado!"
                type="notFound"
              />
            ) : (
              <>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
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

                    <FinishOrder>
                      <h1>{balance(cartTotal)}</h1>
                      <Button onClick={() => finishOrder()}>
                        {loading ? "Carregando..." : "Finalizar Pedido"}
                      </Button>
                    </FinishOrder>
                  </>
                )}
              </>
            )}
          </motion.section>
        </Content>

        {/* <Footer style={{ marginTop: "20rem" }} /> */}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "choconatys.token": token } = parseCookies(ctx);

  return {
    props: {
      isAuth: !!token,
    },
  };
};

export default Cart;
