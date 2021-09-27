import { Container, Content, Logo } from "./styles";

import ChoconatysLogo from "../../assets/logo.png";

const Footer: React.FC = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Content>
        {/* <Logo src={ChoconatysLogo} alt="Logo Choconatys" />
        
        <div className="divisor"></div> */}

        <div className="info">
          <p>Desenvolvido por grupo de Choconaty's <br /> eu@choconatys.com.br</p>
        </div>
      </Content>
    </Container>
  );
}

export default Footer;
