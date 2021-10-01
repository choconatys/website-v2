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
  ItemOrder,
  Items,
  FinishOrder,
} from "../styles/pages/orders";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";
import balance from "../services/balance";
import { useAuth } from "../prodivers/auth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";

const Orders: React.FC = (props: any) => {
  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  const { items, cartTotal, updateItemQuantity } = useCart();
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

  return (
    <>
      <Head>
        <title>Choconatys | Pedidos</title>
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
                <HeaderContent>
                  <h1>Pedidos</h1>
                </HeaderContent>

                <Items>
                  {items.map((item) => (
                    <ItemOrder
                      key={item.id}
                      ref={ref}
                      initial={{ y: 20, opacity: 0 }}
                      animate={animationControl}
                    >
                      <div className="info">
                        <h2>Caneca vidro jateado.....</h2>
                      </div>

                      <div className="status">
                        <div className="circle green"></div>

                        <p>EM ANDAMENTO</p>
                      </div>
                    </ItemOrder>
                  ))}
                </Items>
              </>
            )}
          </motion.section>
        </Content>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "choconatys.token": token } = parseCookies(ctx);
  const { "choconatys.user": userData } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuth: true,
      user: JSON.parse(userData),
    },
  };
};

export default Orders;
