import Head from "next/head";

import { HiChevronUp } from "react-icons/hi";

import Button from "../components/button";
import Header from "../components/header";
import CardAboutUs from "../components/cardAboutUs";

import {
  Container,
  Content,
  Carousel,
  CarouselContent,
  AboutUs,
  Welcome,
  ButtonsWrapper,
  ButtonAboutUs,
} from "../styles/pages";

import { ButtonTop } from "../styles/global";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../providers/auth";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Home: React.FC = (props: any) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Choconatys | Início</title>
      </Head>

      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* <ButtonTop href="#topPage">
          <HiChevronUp />
        </ButtonTop> */}

        <Header isAuthenticated={props.isAuth} />

        <Carousel>
          <CarouselContent>
            <Welcome>
              <h1>Bem vindo a Choconaty's</h1>

              <h2>
                Nosso objetivo é adocicar aquele seu dia triste e sem graça!
              </h2>

              <ButtonsWrapper>
                <Button onClick={() => router.push("/products")}>
                  Ver Cardápio
                </Button>
                <ButtonAboutUs href="#aboutUs">Sobre Nós</ButtonAboutUs>
              </ButtonsWrapper>
            </Welcome>
          </CarouselContent>
        </Carousel>
        <Content>
          <AboutUs id="aboutUs">
            <CardAboutUs />
          </AboutUs>
        </Content>

        {/* <Footer /> */}
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

export default Home;
