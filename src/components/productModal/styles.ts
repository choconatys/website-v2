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

    background: rgba(0, 0, 0, .2);

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

    padding: 1rem;

    border-radius: .2rem;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .photoWrapper {
        width: 40%;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const ModalPhoto  = styled.img`
    width: 100%;
    min-height: 20rem;

    object-fit: cover;

    border-radius: .2rem;
`;

export const ModalInfo  = styled.div`
    width: 55%;
    padding: .5rem 2rem 0 0;

    h2 {
        font-weight: 500;
        color: var(--text);
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

    > button {
        width: 16rem;
    }

    .quantityWrapper {
        width: 10rem;
        margin-right: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-radius: .2rem;
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
            
            transition: color, background-color .2s;
            border-radius: .2rem;

            &:hover {
                background: var(--primary);
                color: var(--white);
            }
        }
    }
`;

export const ModalCloseButton = styled.button`
    position: absolute;

    top: 1rem;
    right: 1rem;

    font-size: 1.2rem;

    color: var(--primary);
`;
