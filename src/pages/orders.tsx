import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import Head from "next/head";

import Header from "../components/header";

import {
  Container,
  Content,
  HeaderContent,
  Items,
} from "../styles/pages/orders";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import balance from "../services/balance";
import OrderItem, { OrderItemProps } from "../components/orderItem";

const Orders: React.FC = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderItemProps[]>([]);
  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  const { addAlert } = useAlert();

  useEffect(() => {
    api
      .get(`/requests/user`)
      .then((response) => {
        setOrders(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
            {!loading && orders.length <= 0 ? (
              <ErrorModel
                title="Ops..."
                subTitle="Nenhum pedido encontrado!"
                type="notFound"
              />
            ) : (
              <>
                <HeaderContent>
                  <h1>Pedidos</h1>
                </HeaderContent>

                <Items>
                  {orders.map((order) => {
                    const orderItem = order[String(Object.keys(order))];

                    return (
                      <motion.div
                        key={orderItem.code}
                        ref={ref}
                        initial={{ y: 20, opacity: 0 }}
                        animate={animationControl}
                        style={{ marginBottom: "2rem" }}
                      >
                        <OrderItem order={orderItem} />
                      </motion.div>
                    );
                  })}
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
