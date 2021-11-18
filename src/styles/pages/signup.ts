import { motion } from "framer-motion";
import styled from "styled-components";

import BackgroundTop from "../../assets/backgroundTop.png";
import BackgroundLeft from "../../assets/backgroundLeft.png";

export const Container = styled(motion.main)`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: url(${BackgroundTop});
  background-position-y: 10rem;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
`;

export const FormWrapper = styled(motion.section)`
  position: relative;

  width: 100%;
  max-width: 45%;
  background: var(--white);

  padding: 5rem 2rem;

  border-radius: 0.5rem;
  box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);

  @media (max-width: 840px) {
    max-width: 60%;
  }

  @media (max-width: 600px) {
    max-width: 80%;
  }

  @media (max-width: 470px) {
    max-width: 90%;
  }

  @media (max-width: 500px) {
    max-width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const FormAnimation = styled(motion.section)`
  .titles {
    max-width: 28rem;
    margin: 0 auto;
    text-align: center;

    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    h2 {
      font-weight: 400;
    }
  }

  @media (max-width: 500px) {
    .titles {
      max-width: calc(100% -1rem);

      h1 {
        font-size: 2rem;
      }
    }
  }
`;

export const Content = styled.section`
  width: 100%;
  max-width: 1400px;
  height: calc(100vh - 15rem);

  margin: 0 auto;

  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SignUpForm = styled.form`
  width: 100%;
  max-width: 90%;

  margin: 0 auto;
  margin-top: 4rem;

  display: flex;
  flex-direction: column;
`;

export const MoreInformation = styled.section`
  margin-top: 1rem;

  a {
    color: var(--primary);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BackgroundWrapper = styled.section`
  width: 37%;
  height: 37%;

  background: url(${BackgroundLeft}) center;
  background-size: 100%;
  background-repeat: no-repeat;
`;
