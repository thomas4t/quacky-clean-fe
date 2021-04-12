import { Fab, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { ProductType } from "../../lib/types/product";
import { useCart } from "../../lib/context/CartContext";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityContainer = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
`;

function ProductPicker(props: { prodId: ProductType["ID_Product"] }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleDecrement = () => {
    quantity !== 1 && setQuantity((quantity) => quantity - 1);
  };

  const onAddToCart = async () => {
    const res = await addItem({ itemCode: props.prodId, quantity });
    // This is ugly
    console.log(res);
    if (res) {
      alert(`success :) added ${quantity} items to cart`);
      setQuantity(1);
    }
  };

  return (
    <MainContainer>
      <QuantityContainer>
        <IconButton
          aria-label="decrement"
          size={"medium"}
          onClick={handleDecrement}
        >
          <RemoveIcon />
        </IconButton>
        <div style={{ padding: "3px" }}>
          <strong>{quantity}</strong>
        </div>
        <IconButton
          aria-label="increment"
          size={"medium"}
          onClick={handleIncrement}
        >
          <AddIcon />
        </IconButton>
      </QuantityContainer>
      <Fab
        variant="extended"
        size={"small"}
        color={"primary"}
        onClick={onAddToCart}
      >
        Add to cart
      </Fab>
    </MainContainer>
  );
}

export default ProductPicker;
