import { Container, Content } from "./styles";

const Footer: React.FC<any> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Content>
        <div className="info">
          <p>Desenvolvido por grupo de Choconaty's <br /> eu@choconatys.com.br</p>
        </div>
      </Content>
    </Container>
  );
}

export default Footer;
