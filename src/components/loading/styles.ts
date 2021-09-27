import { motion } from "framer-motion";

import styled from "styled-components";

export const Container = styled(motion.main)`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: var(--white);
`;
