import { motion } from "framer-motion";

import BackgroundInternalError from "../../assets/error500.png";
import BackgroundNotFoundError from "../../assets/error404.png";

import styled from "styled-components";
import { ErrorModelProps } from ".";



export const Container = styled(motion.section)`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .info {
        margin-top: 2rem;

        text-align: center;
    }

    h1 {
        font-size: 2.6rem;
        font-weight: 400;
    }
`;

export const Background = styled.section<ErrorModelProps>`
    width: 100%;
    height: 25rem;

    background: url(${props => props.type === "internalError" ? BackgroundInternalError : BackgroundNotFoundError}) center;
    background-size: contain;
    background-repeat: no-repeat;
`;
