import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import StickyHeader from "./StickyHeader";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ResponsiveLayout = (props: { children: React.ReactNode }) => (
  <AppContainer>
    <StickyHeader />
    {props.children}
    <Footer />
  </AppContainer>
);

export default ResponsiveLayout;
