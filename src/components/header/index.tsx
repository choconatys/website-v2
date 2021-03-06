import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import Logo from "../../assets/logo.png";

import { useRouter } from "next/dist/client/router";

import {
  Container,
  Navigator,
  LogoTipo,
  LogoButton,
  FinalButton,
} from "./styles";
import { HiShoppingCart, HiShoppingBag, HiMenu, HiX } from "react-icons/hi";
import { Badge } from "@mui/material";
import { useCart } from "react-use-cart";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }: HeaderProps) => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { items } = useCart();

  useEffect(() => {
    if (router.pathname === "/signin" || router.pathname === "/signup") {
      setIsLoginPage(true);
    }
  }, []);

  return (
    <Container id="topPage">
      <Navigator>
        <section className="logo">
          <Link href="/">
            <LogoButton>
              <LogoTipo src={Logo} alt="Logo Tipo" />
            </LogoButton>
          </Link>
        </section>

        {!isLoginPage && (
          <>
            <section className="controllers">
              <div className="buttons">
                <Link href="/">
                  <a>Início</a>
                </Link>

                <Link href="/products">
                  <a>Cardápio</a>
                </Link>

                {isAuthenticated && (
                  <>
                    <Link href="/profile">
                      <a>Perfil</a>
                    </Link>

                    <Link href="/orders">
                      <a>
                        <HiShoppingBag />
                      </a>
                    </Link>
                  </>
                )}

                <Link href="/cart">
                  <a>
                    <Badge badgeContent={items.length} color="primary">
                      <HiShoppingCart color="action" />
                    </Badge>
                  </a>
                </Link>
              </div>

              {!isAuthenticated && (
                <Link href="/signin">
                  <FinalButton>Entrar</FinalButton>
                </Link>
              )}
            </section>

            <section className="menu-mobile">
              <button
                className="menu-mobile-button"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <HiMenu />
              </button>
            </section>

            {menuIsOpen && (
              <section className="menu-mobile-items">
                <button
                  className="close-mobile-items"
                  onClick={() => setMenuIsOpen(false)}
                >
                  <HiX />
                </button>

                <div className="buttons-mobile">
                  <Link href="/">
                    <a>Início</a>
                  </Link>

                  <Link href="/products">
                    <a>Cardápio</a>
                  </Link>

                  {isAuthenticated && (
                    <>
                      <Link href="/profile">
                        <a>Perfil</a>
                      </Link>

                      <Link href="/orders">
                        <a>
                          <HiShoppingBag />
                        </a>
                      </Link>
                    </>
                  )}

                  <Link href="/cart">
                    <a>
                      <Badge badgeContent={items.length} color="primary">
                        <HiShoppingCart color="action" />
                      </Badge>
                    </a>
                  </Link>
                </div>

                {!isAuthenticated && (
                  <Link href="/signin">
                    <FinalButton style={{ margin: 0, marginTop: "2rem" }}>
                      Entrar
                    </FinalButton>
                  </Link>
                )}
              </section>
            )}
          </>
        )}
      </Navigator>
    </Container>
  );
};

export default Header;
