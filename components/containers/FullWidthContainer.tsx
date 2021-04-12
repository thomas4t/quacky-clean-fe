import styled from "styled-components";

const FullWidthContainer = styled.div`
  margin: 15px auto;
  padding-top: 100px;

  //mobile
  @media only screen and (max-width: 400px) {
    width: 95%;
  }
  //medium
  @media only screen and (max-width: 680px) {
    width: 70%;
  }
  //large
  @media only screen and (max-width: 1200px) {
    width: 80%;
  }

  //default max
  width: 60%;
`;
export default FullWidthContainer;
