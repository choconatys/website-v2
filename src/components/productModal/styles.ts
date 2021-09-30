import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);

  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled(motion.div)`
  position: relative;
  background: var(--white);

  width: 100%;
  max-width: 1000px;

  min-height: 20rem;

  margin: 0 auto;

  padding: 1rem 2rem;

  border-radius: 0.2rem;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .photoWrapper {
    width: 40%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1035px) {
    .photoWrapper {
      width: 100%;
      height: 40%;

      flex-wrap: wrap;
    }

    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    max-width: 100%;
    height: 100%;
  }
`;

export const ModalPhoto = styled.img`
  width: 100%;
  min-height: 20rem;

  object-fit: cover;

  border-radius: 0.2rem;

  @media (max-width: 1035px) {
    width: 100%;
    height: 40%;

    flex-wrap: wrap;
  }
`;

export const ModalInfo = styled.div`
  width: 55%;
  padding: 0.5rem 2rem 0 0;

  h2 {
    font-weight: 500;
    color: var(--text);
  }

  @media (max-width: 1035px) {
    width: 100%;
    height: 100rem;

    flex-wrap: wrap;
    background: var(--white);
  }
`;

export const ModalDescription = styled.div`
  margin-top: 1.5rem;

  p {
    text-align: justify;
  }

  .price {
    margin-top: 1rem;

    span {
      color: var(--green);

      font-size: 1rem;
      font-weight: 500;
    }
  }
`;

export const ModalButtonsWrapper = styled.section`
  position: absolute;

  bottom: 1rem;
  right: 1rem;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  padding: 0 1rem;

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

      font-size: 1.2rem;
      height: 100%;

      color: var(--primary);

      transition: color, background-color 0.2s;
      border-radius: 0.2rem;

      &:hover {
        background: var(--primary);
        color: var(--white);
      }
    }
  }

  @media (max-width: 477px) {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    background: var(--white);

    position: static;

    justify-content: center;
    align-items: center;

    margin-top: 1rem;

    > button {
      width: 100%;
    }
    .quantityWrapper {
      width: 100%;
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;

  top: 1rem;
  right: 1rem;

  font-size: 1.2rem;

  color: var(--primary);

  @media (max-width: 477px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;
