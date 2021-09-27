import { shade } from "polished";

import styled from "styled-components";

export const Container = styled.header`
    width: 100%;
    padding: 2rem;
    background: transparent;
`;

export const Navigator = styled.nav`
    max-width: 1400px;
    height: 100%;

    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .controllers {
        display: flex;
        align-items: center;
    }

    .buttons {
        display: flex;
        align-items: center;

        a {
            display: flex;
            align-items: center;
    
            svg {
                font-size: 1.4rem;
            }
    
            color: var(--textHeader);
            font-weight: 400;
            font-size: 1.2rem;
            
            transition: color .2s;
    
            & + a {
                margin-left: 3rem;
            }
    
            &:hover {
                color: ${shade(.1, "#FFFF")};
            }
        }
    }

    @media (max-width: 670px) {
        .controllers {
            display: none;
        }

        .buttons {
            display: none;
        }
    }
`;

export const LogoButton = styled.a`
    width: 15rem;
`;

export const LogoTipo = styled.img`
    width: 60%;
`;

export const FinalButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    font-weight: 500;

    width: 7rem;
    margin-left: 5rem;

    background: var(--primary);
    padding: .6rem 2rem;

    color: var(--white);

    transition: background-color .2s;

    border-radius: .2rem;

    &:hover {
        background: ${shade(.2, "#FFAABA")};
    }
`;
