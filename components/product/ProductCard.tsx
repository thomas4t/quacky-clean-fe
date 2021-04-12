import { ProductType } from "../../lib/types/product";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { useAccount } from "../../lib/context/AccountContext";
import AppLink from "../common/AppLink";
import React from "react";
import ProductPicker from "./ProductPicker";

const MainInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ProductCard(props: { item: ProductType }) {
  const { item } = props;
  const { isLogged } = useAccount();
  return (
    <Paper
      elevation={5}
      style={{
        margin: "50px 0",
        padding: "15px 30px",
      }}
    >
      <MainInfoContainer>
        <div style={{ width: "33%", textAlign: "left" }}>
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
      </MainInfoContainer>

      <hr />

      <DescriptionContainer>
        <span style={{ alignSelf: "flex-start" }}>{item.description_p}</span>
        {isLogged ? (
          <ProductPicker prodId={item.ID_Product} />
        ) : (
          <span>
            Purchase available after <AppLink to={"login"}>login</AppLink>
          </span>
        )}
      </DescriptionContainer>
    </Paper>
  );
}

export default ProductCard;
