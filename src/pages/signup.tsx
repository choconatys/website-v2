import { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Button from "../components/button";
import Input from "../components/input";
import Header from "../components/header";

import { HiOutlineChevronLeft } from "react-icons/hi";

import { useAlert } from "../providers/alert";
import { useAuth } from "../providers/auth";
import { ButtonBack } from "../styles/global";
import {
  Container,
  Content,
  SignUpForm,
  FormWrapper,
  FormAnimation,
} from "../styles/pages/signup";
import { useRouter } from "next/router";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nameField, setNameField] = useState<string>("");
  const [emailField, setEmailField] = useState<string>("");
  const [addressField, setAddressField] = useState<string>("");
  const [passwordField, setPasswordField] = useState<string>("");

  const { createUser } = useAuth();
  const router = useRouter();

  const { addAlert } = useAlert();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (emailField != "" && nameField != "" && addressField != "") {
      if (!(passwordField.length >= 6)) {
        addAlert({
          severity: "error",
          message: "Senha deve conter 6 caracteres!",
        });

        setLoading(false);
        return;
      }

      await createUser({
        name: nameField,
        email: emailField,
        address: addressField,
        password: passwordField,
      })
        .catch(() => {
          addAlert({
            severity: "error",
            message: "Erro ao criar o usuario!",
          });
        })
        .finally(() => setLoading(false));
    } else {
      addAlert({
        severity: "error",
        message: "Verifique os campos!",
      });
    }
  };

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
        <Header isAuthenticated={false} />
        <Content>
          <FormWrapper>
            <FormAnimation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
            >
              <ButtonBack onClick={() => router.push("/signin")}>
                <HiOutlineChevronLeft />
              </ButtonBack>
              <section className="titles">
                <h1>Criar uma Conta</h1>
                <h2>Bem-vindo a nossa loja virtual!</h2>
              </section>

              <SignUpForm onSubmit={(e) => handleSubmitForm(e)}>
                <Input
                  id="name"
                  type="name"
                  placeholder="Digite seu nome"
                  label="Nome"
                  onChange={(event: any) => setNameField(event.target.value)}
                  required
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  label="Email"
                  onChange={(event: any) => setEmailField(event.target.value)}
                  required
                />
                <Input
                  id="address"
                  type="address"
                  placeholder="Digite seu endereço"
                  label="Endereço"
                  onChange={(event: any) => setAddressField(event.target.value)}
                  required
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  label="Senha"
                  onChange={(event: any) =>
                    setPasswordField(event.target.value)
                  }
                  required
                />

                <Button
                  type="submit"
                  style={{ marginTop: 40 }}
                  disabled={!passwordField && !emailField}
                >
                  {loading ? "Carregando..." : "Criar"}
                </Button>
              </SignUpForm>
            </FormAnimation>
          </FormWrapper>
        </Content>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "choconatys.token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignIn;
