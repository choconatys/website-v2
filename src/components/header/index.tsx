import { useEffect, useState } from 'react';
import Link from "next/link";

import Logo from "../../assets/logo.png";

import { useRouter } from 'next/dist/client/router';

import { Container, Navigator, LogoTipo, LogoButton, FinalButton } from "./styles";

const Header: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);

  const router = useRouter();

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
                <a>
                  Início
                </a>
              </Link>

              <Link href="/products">
                <a>
                  Cardápio
                </a>
              </Link>
            </div>

            <Link href="/signin">
              <FinalButton>
                Entrar
              </FinalButton>
            </Link>
          </section>
        )}
      </Navigator>
    </Container>
  );
}

export default Header;
