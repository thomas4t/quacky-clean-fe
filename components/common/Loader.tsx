import styled from "styled-components";

//TODO add props to size n shit
// also take colors from theme
const Spinner = styled("div")`
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid ${(props) => props.theme.primary};
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1.5s linear infinite; /* Safari */
  animation: spin 1.5s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => <Spinner />;

export default Loader;
