import { Button } from "@mui/material";
import { motion } from "framer-motion";

import styled from "styled-components";

export const Container = styled(motion.section)`
    width: 100%;
    max-width: 400px;

    position: absolute;

    top: 1rem;
    right: 1rem;

    section + section {
        margin-top: .5rem;
    }
`;
