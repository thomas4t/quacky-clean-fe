import React, { useState } from "react";
import styled from "styled-components";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import AppLink from "./AppLink";
import { Button, Typography } from "@material-ui/core";
import { CategoryType } from "../../lib/types/category";
import axios from "axios";
import { useDidMount } from "../../lib/hooks/useDidMount";
import LoginDrawer from "../user/LoginDrawer";

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

function StickyHeader() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  //TODO rework this into context usage
  useDidMount(async () => {
    const url = "https://quacky-clean-be.herokuapp.com" + "/categories";
    console.log(url);
    const data: CategoryType[] = await (await axios.get(url)).data;
    setCategories(data);
  });

  return (
    <StickyHeaderContainer>
      {/* <AppLink to="homepage">
        
      </AppLink>
      <AppLink to="category">Link to cat only</AppLink>
      <AppLink to="category" extraParam="2">
        Link to cat2
      </AppLink> */}
      <Button>
        <AppLink to="homepage">
          <AppLogo />
        </AppLink>
      </Button>

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

      <LoginDrawer />
    </StickyHeaderContainer>
  );
}

export default StickyHeader;
