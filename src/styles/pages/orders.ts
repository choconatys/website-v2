import styled from "styled-components";

import { motion } from "framer-motion";

export const Container = styled(motion.main)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.section`
  width: 100%;
  max-width: 1400px;

  padding: 0 1rem 3rem;
  margin: 0 auto;
  margin-top: 4rem;
`;

export const HeaderContent = styled.header`
  width: 100%;

  h1 {
    font-family: Ephesis;
    font-size: 5rem;
  }
`;

export const Items = styled.section`
  margin-top: 3rem;
`;

export const ModalButtonsWrapper = styled.section`
  display: flex;
  align-items: center;

  > button {
    width: 16rem;
  }

  .quantityWrapper {
    width: 10rem;
    margin-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 0.2rem;
    border: 1px solid var(--gray);
    height: 3.5rem;

    span {
      padding: 1rem 1.2rem;

      font-weight: 600;
    }

    .quantityButton {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0 1rem;

      height: 100%;

      font-size: 1.2rem;

      color: var(--primary);

      transition: color, background-color 0.2s;
      border-radius: 0.2rem;

      &:hover {
        background: var(--primary);
        color: var(--white);
      }
    }
  }

  @media (max-width: 671px) {
    margin-top: 1rem;
  }
`;

export const FinishOrder = styled.section`
  max-width: 600px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin: 3rem auto;

  h1 {
    font-weight: 500;
    font-size: 2rem;
  }

  button {
    max-width: 15rem;
  }

  @media (max-width: 410px) {
    button {
      max-width: 100%;
      margin-top: 1rem;
    }
  }
`;
