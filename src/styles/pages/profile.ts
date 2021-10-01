import { motion } from "framer-motion";

import styled from "styled-components";

export const Container = styled(motion.main)`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.section`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  padding: 0 1rem 3rem;
  margin: 0 auto;
  margin-top: 4rem;

  text-align: center;
`;

export const HeaderContent = styled.header`
  h1 {
    font-family: Ephesis;
    font-size: 5rem;
  }

  @media (max-width: 556px) {
    text-align: center;
  }
`;

export const EditProfileForm = styled.form`
  width: 100%;

  margin-top: 4rem;

  display: flex;
  flex-direction: column;
`;
