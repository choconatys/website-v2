import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import balance from "../../services/balance";
import {
  ButtonMore,
  Container,
  ItemDescription,
  ItemOrder,
  ItemProduct,
} from "./styles";

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
  };
}

const OrderItem: React.FC<OrderItemProps> = ({ order }: OrderItemProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <Container onClick={() => setShowMore(!showMore)}>
      <ItemOrder>
        <div className="info">
          <h2>#{order.code}</h2>
        </div>

        <div className="status">
          <div className="circle green"></div>

          <p>EM ANDAMENTO</p>

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
        </ItemDescription>
      )}
    </Container>
  );
};

export default OrderItem;
