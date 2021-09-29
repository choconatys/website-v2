import Head from "next/head";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import dynamic from "next/dynamic";

import Pagination from "@mui/material/Pagination";

import ProductsData from "../interface/products";

import { api } from "../services/api";

import Header from "../components/header";
import Product from "../components/product";

import {
  Container,
  Content,
  HeaderContent,
  ProductList,
  SkeletonItem,
  StackPagination,
} from "../styles/pages/products";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";
import balance from "../services/balance";

const ProductModal = dynamic(() => import("../components/productModal"), {
  loading: () => <p>Carregando...</p>,
  ssr: false,
});

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [productFocus, setProductFocus] = useState<ProductsData>(null);
  const [quantity, setQuantity] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [internalError, setInternalError] = useState<boolean>(false);

  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  const { addAlert } = useAlert();

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    api
      .get("/products")
      .then((response) => {
        const productsData = response.data.data;

        productsData?.map((product) => {
          product.priceFormated = balance(product.price);
        });

        setProducts(productsData);
      })
      .catch((error) => {
        setInternalError(true);

        addAlert({
          severity: "error",
          message: "Erro interno no servidor!",
        });
      })
      .finally(() => setLoading(false));
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
        <title>Choconatys | Menu</title>
      </Head>

      {productFocus && <ProductModal product={productFocus} />}

      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header />

        <Content>
          {internalError && (
            <ErrorModel
              title="Erro interno no servidor!"
              subTitle="Entre em contato com eu@choconatys.com.br"
              type="internalError"
            />
          )}
          {products.length == 0 && !internalError && !loading && (
            <ErrorModel
              title="Ops... Que pena :("
              subTitle="Atualmente não temos nenhum docinho disponivel!"
              type="notFound"
            />
          )}

          <motion.section
            ref={ref}
            initial={{ y: 20, opacity: 0 }}
            animate={animationControl}
            exit={{ opacity: 0 }}
          >
            {!internalError && (
              <HeaderContent>
                <h1>Cardápio</h1>
              </HeaderContent>
            )}

            {!loading && !internalError && products.length != 0 ? (
              <>
                <ProductList>
                  {products.map((product) => {
                    return (
                      <Product
                        key={product.id}
                        data={product}
                        onClick={() => {
                          setProductFocus(null);

                          setTimeout(() => {
                            setProductFocus(product);
                            document.getElementsByTagName(
                              "body"
                            )[0].style.overflowY = "hidden";
                          }, 200);
                        }}
                      />
                    );
                  })}
                </ProductList>
              </>
            ) : (
              <>
                {!internalError && (
                  <div style={{ marginTop: "3rem" }}>
                    {[0, 1].map((loader) => {
                      return (
                        <SkeletonItem
                          sx={{ bgcolor: "#f0f0f0" }}
                          variant="rectangular"
                          key={loader}
                          animation="wave"
                          height={"106px"}
                          width={"100%"}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {!internalError && (
              <StackPagination spacing={2}>
                <Pagination count={1} size="large" />
              </StackPagination>
            )}
          </motion.section>
        </Content>

        {/* <Footer style={{ marginTop: "20rem" }} /> */}
      </Container>
    </>
  );
};

export default Products;
