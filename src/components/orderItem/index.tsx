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

export interface OrderItemProps {
  order: {
    code: string;
    requests: {
      name: string;
      quantity: number;
      value_per_product: number;
      product: {
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
      <ItemOrder onClick={() => setShowMore(!showMore)}>
        <div className="info">
          <h2>#{order.code}</h2>
        </div>

        <div className="status">
          <div className="circle green"></div>

          {order.status === RequestsType.AGUARDANDO_CONFIRMACAO && (
            <p>Aguardando Confirmação</p>
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

      {showMore && (
        <ItemDescription
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100%", minHeight: "20rem" }}
        >
          {order.requests.map((request) => (
            <ItemProduct key={request.product.name}>
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
