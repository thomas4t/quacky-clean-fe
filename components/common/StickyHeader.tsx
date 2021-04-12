import React from "react";
import styled from "styled-components";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import AppLink from "./AppLink";
import { Button, Typography } from "@material-ui/core";
import { useCategories } from "../../lib/context/CategoriesContext";
import { useAccount } from "../../lib/context/AccountContext";
import AccountDrawer from "../user/AccountDrawer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AppButton } from "./AppButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigateTo } from "../../lib/hooks/useNavigateTo";
import { HEADER_Z_INDEX } from "../../lib/utils/constants";

const StickyHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: ${HEADER_Z_INDEX};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  color: #fff;
`;

const AppLogo = styled(StrikethroughSIcon)`
  background-color: ${(props) => props.theme.primary};
  font-size: 3.5rem;
  color: #fff;
`;

const CategoryNav = styled.nav`
  a {
    position: relative;
    text-decoration: none;
    color: #fff;

    :hover {
      color: #fff;
    }

    ::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #fff;
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.15s ease-in-out 0s;
    }

    :hover::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  ul {
    list-style-type: none;
  }

  li {
    display: inline-block;
    margin: 0 15px;
  }
`;

const UserSection = styled("div")`
  width: 25%;
  text-align: right;
  margin-right: 20px;
`;

const LoggedInSection = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

function HomeLogoButton() {
  return (
    <div style={{ width: "25%" }}>
      <Button>
        <AppLink to="homepage">
          <AppLogo />
        </AppLink>
      </Button>
    </div>
  );
}

function StickyHeader() {
  const account = useAccount();
  const navigateTo = useNavigateTo();
  const { categories } = useCategories();

  const navigateToCart = async () => {
    await navigateTo("cart");
  };

  const navigateToLogin = async () => {
    await navigateTo("login");
  };

  return (
    <StickyHeaderContainer>
      <HomeLogoButton />

      <CategoryNav>
        <ul>
          {categories.map((ctg) => {
            const categoryID = String(ctg.ID_Category);
            const categoryName = ctg.name_c;
            return (
              <li key={categoryID}>
                <Typography variant="h5">
                  <AppLink to="category" extraParam={categoryID}>
                    {categoryName}
                  </AppLink>
                </Typography>
              </li>
            );
          })}
        </ul>
      </CategoryNav>

      <UserSection>
        {account.isLogged ? (
          <LoggedInSection>
            <AppButton onClick={navigateToCart}>
              Cart
              <ShoppingCartIcon fontSize="large" />
            </AppButton>

            <AccountDrawer />
          </LoggedInSection>
        ) : (
          <AppButton onClick={navigateToLogin}>
            <span>Login</span>
            <LockOpenIcon fontSize="large" />
          </AppButton>
        )}
      </UserSection>
    </StickyHeaderContainer>
  );
}

export default StickyHeader;
