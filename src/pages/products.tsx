import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import Pagination from '@mui/material/Pagination';
import { Alert, CircularProgress } from "@mui/material";

import { HiMinusSm, HiPlus } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";

import ProductsData from "../interface/products";

import CafeTeste from "../assets/cafe.jpg";

import { api } from "../services/api";

import { LoadingWrapper } from "../styles/global";

import Button from "../components/button";
import Header from "../components/header";
import Product from "../components/product";

import { 
  Container,
  Content,
  HeaderContent,
  ProductList,
  StackPagination,
} from "../styles/pages/products";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";
import balance from "../services/balance";
import ProductModal from "../components/productModal";

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
    setTimeout(() => {
      api.get("/products")
      .then((response) => {
        const productsData = response.data;
        
        productsData?.map((product) => {
          product.priceFormated = balance(product.price);
        });

        setProducts(productsData);
      })
      .catch((error) => {
        addAlert({
          severity: "error",
          message: "Erro interno no servidor!",
        });

        setInternalError(true);
      })
      .finally(() => setLoading(false));
    }, 1000);
  }, []);

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
    <>
      <Head>
        <title>Choconatys | Menu</title>
      </Head>

      {productFocus && (
        <ProductModal product={productFocus} />
      )}

      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >        
        <Header />

        <Content>
          {internalError && (<ErrorModel type="internalError" />)}
          {(products.length == 0 && !internalError && !loading) && (<ErrorModel type="notFound" />)}

          {loading && (
            <LoadingWrapper>
              <CircularProgress style={{ margin: 80 }} />
            </LoadingWrapper>
          )}

          {(!loading && !internalError && products.length != 0) && (
            <motion.section
              ref={ref}
              initial={{ y: 20, opacity: 0 }}
              animate={animationControl}
              exit={{ opacity: 0 }}
            >
              <HeaderContent>
                <h1>Cardápio</h1>
              </HeaderContent>
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
                            document.getElementsByTagName("body")[0].style.overflowY = "hidden";
                          }, 200);
                        }}
                      />
                  )
                })}
              </ProductList>
              <StackPagination spacing={2}>
                <Pagination count={1} size="large" />
              </StackPagination>
            </motion.section>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Products;
