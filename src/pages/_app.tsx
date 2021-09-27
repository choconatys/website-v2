import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';

import GlobalStyle, { myTheme } from "../styles/global";

import Loading from "../components/loading";
import { motion } from "framer-motion";
import { Router } from "next/dist/client/router";
import { AlertProvider } from "../prodivers/alert";
import { CartProvider } from "react-use-cart";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Router.events.on("routeChangeComplete", (e) => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <ThemeProvider theme={myTheme}>
      {loading ? (
        <Loading />
      ) : (
        <AlertProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </AlertProvider>
      )}
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp
