import styled from "styled-components";

import BackgroundMenu from "../../assets/BackgroundMenu.png";

export const Container = styled.footer`    
    width: 100%;

`;

export const Content = styled.section`
    background: url(${BackgroundMenu});
    background-size: cover;
    background-repeat: no-repeat;

    color: var(--white);
    font-size: .9rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 4rem 2rem;

    .info {
        text-align: center;
    }

    a {
        color: var(--white);
    }

    p {
        margin-top: 4rem;
    }
`;

export const Logo = styled.img`
    width: 14rem;
    object-fit: contain;

    margin-bottom: 2rem;
`;
