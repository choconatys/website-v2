import { motion } from "framer-motion";
import { shade } from "polished";

import Stack from '@mui/material/Stack';

import styled from "styled-components";
import { Skeleton } from "@mui/material";

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
    h1 {
        font-family: Ephesis;
        font-size: 5rem;
    }
`;

export const ProductList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    margin-top: 3rem;
`;

export const StackPagination = styled(Stack)`
    margin-top: 4rem;

    padding: 0 2rem;
`;

export const SkeletonItem = styled(Skeleton)`
    & + & {
        margin-top: 2rem;
    }
`;
