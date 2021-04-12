import { GetStaticProps } from "next";
import React, { useState } from "react";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";
import { useDidMount } from "../lib/hooks/useDidMount";
import { useCart } from "../lib/context/CartContext";
import Loader from "../components/common/Loader";
import styled from "styled-components";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import FullWidthContainer from "../components/containers/FullWidthContainer";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  width: auto;
  margin: 20px 0;
`;

function CartPage() {
  const { items, loadItems, clearItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCartPrice = items
    .map((li) => Number(li.price) * li.quantity)
    .reduce((sum, val) => sum + val, 0)
    .toFixed(1);

  useDidMount(async () => {
    loadItems();
  });

  const processOrder = async () => {
    setIsSubmitting(true);
    alert("WIP :}");
    //TODO place order
    await new Promise((res) => setTimeout(res, 1500));
    setIsSubmitting(false);
  };

  const onClearCart = async () => {
    //loading true
    await clearItems();
    //loading false
  };

  const isCartEmpty = items.length === 0;
  return (
    <FullWidthContainer>
      <CartContainer>
        <h1>Cart</h1>
        {isCartEmpty ? (
          <h2>Seems there is nothing there :C</h2>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="cart items table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h3>Name</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Specifics</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Quantity</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Price</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => {
                    const itemName = item.name_p;
                    const specifics = item.color || `id: ${item.ID_Product}`;
                    const quantity = item.quantity;
                    const totalItemPrice = Number(item.price) * quantity;
                    return (
                      <TableRow key={item.name_p}>
                        <TableCell component="th" scope="row">
                          {itemName}
                        </TableCell>
                        <TableCell align="right">{specifics}</TableCell>
                        <TableCell align="right">{quantity}</TableCell>
                        <TableCell align="right">
                          {totalItemPrice.toFixed(1)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell>
                      <strong>TOTAL</strong>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell align="right">
                      <strong> ~ {totalCartPrice}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <ButtonSection>
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={onClearCart}
                startIcon={<DeleteIcon />}
              >
                Clear cart
              </StyledButton>
              <StyledButton
                color={"primary"}
                variant={"outlined"}
                onClick={processOrder}
                startIcon={<SendIcon />}
                disabled={isSubmitting}
              >
                <span>Place order</span>
              </StyledButton>
            </ButtonSection>
            {isSubmitting && <Loader />}
          </>
        )}
      </CartContainer>
    </FullWidthContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getGlobalData();

  return {
    props: {
      ...data,
    },
  };
};

export default withGlobalData(CartPage);
