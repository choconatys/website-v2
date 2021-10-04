import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import balance from "../../services/balance";
import {
  ButtonMore,
  Container,
  ItemDescription,
  ItemOrder,
  ItemProduct,
  ItemBottom,
  ItemMiddle,
  ImageStatus,
} from "./styles";

import Aguardando from "../../assets/emAguardo.png";
import Produzindo from "../../assets/produzindo.png";
import Pronto from "../../assets/pronto.png";
import Enviado from "../../assets/enviado.png";

export interface OrderItemProps {
  order: {
    code: string;
    requests: {
      name: string;
      quantity: number;
      value_per_product: number;
      product: {
        id: string;
        name: string;
      };
    }[];
    total: number;
    status: RequestsType;
  };
}

enum RequestsType {
  AGUARDANDO_CONFIRMACAO = "AGUARDANDO_CONFIRMACAO",
  EM_PRODUCAO = "EM_PRODUCAO",
  PRONTO_PARA_ENVIO = "PRONTO_PARA_ENVIO",
  ENVIADO = "ENVIADO",
}

const OrderItem: React.FC<OrderItemProps> = ({ order }: OrderItemProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <Container>
      {order.status === RequestsType.ENVIADO ? (
        <ItemOrder style={{ opacity: 0.6, cursor: "no-drop" }}>
          <div className="info">
            <h2>#{order.code}</h2>
          </div>

          <div className="status">
            <>
              <div className="circle green"></div>
              <p>Enviado</p>
            </>

            <ButtonMore>
              {showMore ? (
                <HiChevronUp
                  size={30}
                  style={{ marginLeft: 20, color: "#717171" }}
                />
              ) : (
                <HiChevronDown
                  size={30}
                  style={{ marginLeft: 20, color: "#717171" }}
                />
              )}
            </ButtonMore>
          </div>
        </ItemOrder>
      ) : (
        <ItemOrder onClick={() => setShowMore(!showMore)}>
          <div className="info">
            <h2>#{order.code}</h2>
          </div>

          <div className="status">
            {order.status === RequestsType.AGUARDANDO_CONFIRMACAO && (
              <>
                <div className="circle yellow"></div>
                <p>Aguardando Confirmação</p>
              </>
            )}

            {order.status === RequestsType.EM_PRODUCAO && (
              <>
                <div className="circle orange"></div>
                <p>Em Producão</p>
              </>
            )}

            {order.status === RequestsType.PRONTO_PARA_ENVIO && (
              <>
                <div className="circle blue"></div>
                <p>Pronto p/ Envio</p>
              </>
            )}

            <ButtonMore>
              {showMore ? (
                <HiChevronUp
                  size={30}
                  style={{ marginLeft: 20, color: "#717171" }}
                />
              ) : (
                <HiChevronDown
                  size={30}
                  style={{ marginLeft: 20, color: "#717171" }}
                />
              )}
            </ButtonMore>
          </div>
        </ItemOrder>
      )}

      {showMore && (
        <ItemDescription
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100%", minHeight: "20rem" }}
        >
          {order.requests.map((request) => (
            <ItemProduct key={request.product.id}>
              <p>{request.product.name}</p>

              <h3>
                {request.quantity}x {balance(request.value_per_product)}
              </h3>
            </ItemProduct>
          ))}

          <ItemMiddle>
            {order.status === RequestsType.AGUARDANDO_CONFIRMACAO && (
              <div className="info">
                <ImageStatus src={Aguardando} alt="Image Status" />
                <p>Aguardando Confirmação</p>
              </div>
            )}

            {order.status === RequestsType.EM_PRODUCAO && (
              <div className="info">
                <ImageStatus src={Produzindo} alt="Image Produzindo" />
                <p>Em Produção</p>
              </div>
            )}

            {order.status === RequestsType.PRONTO_PARA_ENVIO && (
              <div className="info">
                <ImageStatus src={Pronto} alt="Image pronto p/ Envio" />
                <p>Pronto p/ Envio</p>
              </div>
            )}

            {order.status === RequestsType.ENVIADO && (
              <div className="info">
                <ImageStatus src={Enviado} alt="Image Enviado" />
                <p>Enviado</p>
              </div>
            )}
          </ItemMiddle>

          <ItemBottom>
            <h2>Total</h2>
            <h1>{balance(order.total)}</h1>
          </ItemBottom>
        </ItemDescription>
      )}
    </Container>
  );
};

export default OrderItem;
