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
  ModalButtonsWrapper,
  ModalContent,
  ModalDescription,
  ModalInfo,
  ModalPhoto,
  ModalWrapper,
  ProductList,
  StackPagination,
  ModalCloseButton
} from "../styles/pages/products";
import { useAlert } from "../prodivers/alert";
import ErrorModel from "../components/errorModel";

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
        const productsData: ProductsData[] = response.data;

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

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <>
      <Head>
        <title>Choconatys | Menu</title>
      </Head>

      {productFocus && (
        <ModalWrapper>
          <ModalContent
            ref={ref}
            initial={{ y: 20, opacity: 0 }}
            animate={animationControl}
            exit={{ opacity: 0 }}
          >
            <ModalCloseButton 
              onClick={() => {
                setProductFocus(null);
                document.getElementsByTagName("body")[0].style.overflowY = "scroll";
              }}
            >
              <RiCloseFill />
            </ModalCloseButton>

            <section className="photoWrapper">
              <ModalPhoto src={`http://localhost:3030/${productFocus.photo}`} alt="Photo" />
            </section>

            <ModalInfo>
              <header>
                <h2>{productFocus.name}</h2>
              </header>

              <ModalDescription>
                <p>{productFocus.description}</p>

                <div className="price">
                    <span>R$ {productFocus.price}</span>
                </div>
              </ModalDescription>
            </ModalInfo>

            <ModalButtonsWrapper>
              <div className="quantityWrapper">
                <button
                  onClick={() => decrement()}
                  className="quantityButton"
                >
                  <HiMinusSm />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => increment()}
                  className="quantityButton"
                >
                  <HiPlus />
                </button>
              </div>

              <Button>ADICIONAR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R$ {productFocus.price}</Button>
            </ModalButtonsWrapper>
          </ModalContent>
        </ModalWrapper>
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
                          setProductFocus(product);
                          document.getElementsByTagName("body")[0].style.overflowY = "hidden";
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
