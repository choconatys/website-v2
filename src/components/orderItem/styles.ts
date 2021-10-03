import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  margin-bottom: 2rem;
`;

export const ItemOrder = styled(motion.section)`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  overflow: hidden;

  padding: 2rem;

  transition: border-color 0.2s;

  border: 1px solid var(--background);
  border-radius: 0.2rem;

  &:hover {
    border-color: var(--gray);
  }

  h1 {
    font-size: 1.5rem;
  }

  .status {
    display: flex;
    align-items: center;

    > .circle {
      margin-right: 1rem;
    }
  }

  .info {
    width: 90%;
    max-width: 400px;

    h1 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const ItemDescription = styled(motion.section)`
  position: relative;
  background: var(--white);

  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  overflow: hidden;

  padding: 2rem;

  transition: border-color 0.2s;

  border-left: 1px solid var(--background);
  border-right: 1px solid var(--background);
  border-bottom: 1px solid var(--background);
  border-radius: 0 0 0.2rem 0.2rem;
`;

export const ItemProduct = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonMore = styled.button``;

export const ItemMiddle = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-top: 4rem;
  margin-bottom: 5rem;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ImageStatus = styled.img`
  width: 20rem;
`;

export const ItemBottom = styled.footer`
  position: absolute;

  bottom: 2rem;
  right: 2rem;

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-weight: 500;
    color: var(--text);
    font-size: 1.3rem;
    margin-bottom: -0.2rem;
  }
`;
