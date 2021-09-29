import { useState } from "react";
import Head from "next/head";

import Button from "../components/button";
import Input from "../components/input";
import Header from "../components/header";

import { HiOutlineChevronLeft } from "react-icons/hi";

import { ButtonBack } from "../styles/global";
import {
  Container,
  Content,
  SignInForm,
  MoreInformation,
  FormWrapper,
  FormAnimation,
} from "../styles/pages/signin";

const SignIn: React.FC = () => {
  const [continueWithEmail, setContinueWithEmail] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Choconatys | Entrar</title>
      </Head>

      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header />
        <Content>
          {!continueWithEmail && (
            <FormWrapper
              initial={{ height: "610px" }}
              animate={{ height: "420px" }}
            >
              <FormAnimation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.8 }}
              >
                <section className="titles">
                  <h1>Falta pouco para comer um docinho!</h1>
                  <h2>Como deseja continuar?</h2>
                </section>

                <Button
                  variant={"outlined"}
                  onClick={() => setContinueWithEmail(!continueWithEmail)}
                  style={{ marginTop: 60 }}
                >
                  Continuar com Email
                </Button>
              </FormAnimation>
            </FormWrapper>
          )}

          {continueWithEmail && (
            <FormWrapper
              initial={{ height: "420px" }}
              animate={{ height: "610px" }}
            >
              <FormAnimation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.8 }}
              >
                <ButtonBack
                  onClick={() => setContinueWithEmail(!continueWithEmail)}
                >
                  <HiOutlineChevronLeft />
                </ButtonBack>

                <section className="titles">
                  <h1>Entrar com Email</h1>
                  <h2>Aproveite para dar uma olhada no nosso cardápio</h2>
                </section>

                <SignInForm>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    label="Email"
                    required
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    label="Senha"
                    required
                  />

                  <Button type="submit" style={{ marginTop: 40 }} disabled>
                    Entrar
                  </Button>

                  <MoreInformation>
                    <a href="#">Esqueceu sua Senha?</a>
                  </MoreInformation>
                </SignInForm>
              </FormAnimation>
            </FormWrapper>
          )}
        </Content>
      </Container>
    </>
  );
};

export default SignIn;
