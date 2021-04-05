import React, { useState } from "react";
import styled from "styled-components";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import AppLink from "./AppLink";
import { Button, Typography } from "@material-ui/core";
import { CategoryType } from "../../lib/types/category";
import axios from "axios";
import { useDidMount } from "../../lib/hooks/useDidMount";
import LoginDrawer from "../user/AccountDrawer";
import { useCategories } from "../../lib/context/CategoriesContext";
import { useAccount } from "../../lib/context/AccountContext";
import AccountDrawer from "../user/AccountDrawer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { AppButton } from "./AppButton";

const StickyHeaderContainer = styled.header`
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
  const { categories } = useCategories();

  //TODO rework this into context usage
  // useDidMount(async () => {
  //   const url = "https://quacky-clean-be.herokuapp.com" + "/categories";
  //   console.log(url);
  //   const data: CategoryType[] = await (await axios.get(url)).data;
  //   setCategories(data);
  // });

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
          <AccountDrawer />
        ) : (
          <AppButton>
            <AppLink to="login">LOGIN</AppLink>
            <LockOpenIcon fontSize="large" />
          </AppButton>
        )}
      </UserSection>
    </StickyHeaderContainer>
  );
}

export default StickyHeader;
