import Head from "next/head";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import Button from "../components/button";
import Header from "../components/header";
import CardAboutUs from "../components/cardAboutUs";

import { 
  Container,
  Content,
  Carousel,
  CarouselContent,
  MouseDown,
  AboutUs,
  Welcome,
  ButtonsWrapper,
  ButtonAboutUs
} from "../styles/pages";

import { ButtonTop } from "../styles/global";
import Footer from "../components/footer";
import { useRouter } from "next/dist/client/router";

const Home: React.FC = () => {
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
        <ButtonTop href="#topPage">
          <HiChevronUp />
        </ButtonTop>
        
        <Header />

        <Carousel>
          <CarouselContent>
            <Welcome>
              <h1>Bem vindo a Choconaty's</h1>

              <h2>Nosso objetivo é adocicar aquele seu dia triste e sem graça!</h2>
            
              <ButtonsWrapper>
                <Button onClick={() => router.push("/products")}>Ver Cardápio</Button>
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

        <Footer />
      </Container>
    </>
  );
};

export default Home;
