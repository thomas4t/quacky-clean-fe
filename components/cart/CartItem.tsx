import { ProductType } from "../../lib/types/product";
import styled from "styled-components";

//unused
const StyledFlexItem = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;

function CartItem(props: { item: ProductType }) {
  const { item } = props;
  return (
    <div>
      <StyledFlexItem>
        <div>
          <strong>Name: </strong>
          {item.name_p}
        </div>

        <div>
          <strong>Code: </strong>
          {item.ID_Product}
        </div>

        <div>
          <strong>Price: </strong>
          {item.price}
        </div>
      </StyledFlexItem>
    </div>
  );
}

export default CartItem;
