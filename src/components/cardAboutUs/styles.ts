import { motion } from "framer-motion";

import DonnutBackground from "../../assets/donnut.png";

import styled from "styled-components";
import { shade } from "polished";

export const Container = styled(motion.div)`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;

    overflow: hidden;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    padding: 3rem 1rem;

    .about {
        max-width: 700px;
        
        h1 {
            font-family: Ephesis;
            font-size: 6rem;
            margin-bottom: 2rem;

            text-align: center;
        }

        h2 {
            font-size: 1.3rem;
            font-weight: 300;

            line-height: 2.4rem;
            
            text-align: center;
            
            margin-bottom: 1rem;
        }
    }

    .photo {
        height: 100%;
        width: 35rem;
        background: url(${DonnutBackground}) center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .controls {
        margin-top: 2rem;

        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    @media (max-width: 402px) {        
        .about {
            h1 {
                font-size: 4rem;
                margin-bottom: 1rem;

                text-align: center;
            }

            h2 {
                font-size: 1rem;
            }
        }
    } 
`;

export const ButtonSocial = styled.a`
    display: flex;
    align-items: center;

    color: var(--primary);

    padding: 1rem 2rem;
    
    transition: all .2s;

    border: 1px solid var(--white);
    border-radius: .5rem;

    &:hover {
        border: 1px solid ${shade(0.2, "#FFAABA")};
        color: ${shade(0.2, "#FFAABA")};
    }

    svg {
        font-size: 2rem;

        margin-right: .5rem;
    }
`;
