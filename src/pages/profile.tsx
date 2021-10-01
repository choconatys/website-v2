import { GetServerSideProps, GetStaticProps } from "next";
import { parseCookies } from "nookies";

import Head from "next/head";

import {
  Container,
  Content,
  EditProfileForm,
  HeaderContent,
} from "../styles/pages/profile";
import Input from "../components/input";
import Header from "../components/header";
import Button from "../components/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "../prodivers/auth";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAlert } from "../prodivers/alert";
import router from "next/router";
import { CircularProgress } from "@material-ui/core";

const Profile: React.FC = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nameField, setNameField] = useState<string>("");
  const [emailField, setEmailField] = useState<string>("");
  const [addressField, setAddressField] = useState<string>("");
  const [passwordField, setPasswordField] = useState<string>("");

  const { inView, entry, ref } = useInView();
  const animationControl = useAnimation();

  const { updateUser } = useAuth();
  const { addAlert } = useAlert();

  const updateProfile = async (e: any) => {
    e.preventDefault();

    await api
      .put(`/users/${props?.user.id}`, {
        name: nameField,
        address: addressField,
        email: emailField,
        passwordConfirm: passwordField,
      })
      .then((response) => {
        const userUpdated = response.data.data;

        updateUser(userUpdated);
        addAlert({
          severity: "success",
          message: "Informações atualizadas com sucesso!",
        });

        router.reload();
      })
      .catch((error) => {
        console.log(error);

        addAlert({
          severity: "error",
          message: "Erro ao atualizar perfil!",
        });
      });
  };

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
        <title>Choconatys | Perfil</title>
      </Head>

      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header isAuthenticated={props.isAuth} />

        {!loading ? (
          <Content>
            <motion.section
              ref={ref}
              initial={{ y: 20, opacity: 0 }}
              animate={animationControl}
              exit={{ opacity: 0 }}
            >
              <HeaderContent>
                <h1>Editar Perfil</h1>
              </HeaderContent>

              <EditProfileForm onSubmit={(e) => updateProfile(e)}>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  label="Nome"
                  defaultValue={props.user.name}
                  onChange={(event: any) => setNameField(event.target.value)}
                  required
                />
                <Input
                  id="address"
                  type="address"
                  placeholder="Digite seu endereço"
                  label="Endereço"
                  defaultValue={props.user.address}
                  onChange={(event: any) => setAddressField(event.target.value)}
                  required
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Alterar seu email"
                  label="Email"
                  defaultValue={props.user.email}
                  required
                  disabled
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
                  {loading ? "Carregando..." : "Alterar"}
                </Button>
              </EditProfileForm>
            </motion.section>
          </Content>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
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

export default Profile;
