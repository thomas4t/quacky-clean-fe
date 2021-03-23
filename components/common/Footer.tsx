import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  min-height: 40px;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  color: #fff;
`;

function Footer() {
  return (
    <FooterContainer>
      <strong>Copyright @TT & ŠZ - UHK Project 2021</strong>
    </FooterContainer>
  );
}

export default Footer;
