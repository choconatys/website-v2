import { motion } from "framer-motion";

import DonnutBackground from "../../assets/donnut.png";

import styled from "styled-components";
import { shade } from "polished";

export const Container = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  overflow: hidden;

  padding: 2rem;

  margin-bottom: 1rem;

  transition: border-color 0.2s;

  border: 1px solid var(--background);
  border-radius: 0.2rem;

  &:hover {
    border-color: var(--gray);
  }

  .info {
    h1 {
      font-size: 1.4rem;
      font-weight: 400;
    }
  }

  .price {
    h2 {
      background: var(--primary);
      color: var(--white);
      font-size: 1.2rem;
      font-weight: 400;

      padding: 0.5rem;
      border-radius: 0.2rem;
    }
  }

  @media (max-width: 556px) {
    flex-wrap: wrap;

    .info {
      h1 {
        font-size: 1.3rem;
        text-align: left;
      }
    }
  }

  @media (max-width: 350px) {
    .price {
      margin-top: 1rem;
    }
  }
`;
