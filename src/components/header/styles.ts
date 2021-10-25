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

  .menu-mobile {
    display: none;

    .menu-mobile-button {
      color: var(--textHeader);

      svg {
        font-size: 2rem;
      }
    }
  }

  .menu-mobile-items {
    .close-mobile-items {
      position: absolute;
      top: 2rem;

      svg {
        font-size: 2rem;
        fill: var(--primary);
      }
    }

    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    z-index: 99;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: var(--background);
  }

  .buttons-mobile {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    a {
      display: flex;
      align-items: center;

      svg {
        font-size: 1.4rem;
      }

      color: var(--textHeader);
      font-weight: 400;
      font-size: 1.2rem;

      transition: color 0.2s;

      & + a {
        margin-top: 3rem;
      }

      &:hover {
        color: ${shade(0.1, "#FFFF")};
      }
    }
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

      transition: color 0.2s;

      & + a {
        margin-left: 3rem;
      }

      &:hover {
        color: ${shade(0.1, "#FFFF")};
      }
    }
  }

  @media (max-width: 746px) {
    .controllers {
      display: none;
    }

    .buttons {
      display: none;
    }

    .menu-mobile {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const LogoButton = styled.a`
  width: 10rem;
`;

export const LogoTipo = styled.img`
  width: 10rem;
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
  padding: 0.6rem 2rem;

  color: var(--white);

  transition: background-color 0.2s;

  border-radius: 0.2rem;

  &:hover {
    background: ${shade(0.2, "#FFAABA")};
  }
`;
