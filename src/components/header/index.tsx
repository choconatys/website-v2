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
import { HiShoppingCart } from "react-icons/hi";
import { Badge } from "@mui/material";
import { useCart } from "react-use-cart";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }: HeaderProps) => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);

  const router = useRouter();

  const { items } = useCart();

  useEffect(() => {
    if (router.pathname === "/signin") {
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
          <section className="controllers">
            <div className="buttons">
              <Link href="/">
                <a>Início</a>
              </Link>

              <Link href="/products">
                <a>Cardápio</a>
              </Link>

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
        )}
      </Navigator>
    </Container>
  );
};

export default Header;
