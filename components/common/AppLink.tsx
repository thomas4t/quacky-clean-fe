import styled from "styled-components";
import Link from "next/link";
import { AppPagesNames } from "../../lib/types/core";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.linkCol};
  :hover {
    opacity: 90%;
  }
`;

const AppLink = (props: {
  to: AppPagesNames;
  extraParam?: string;
  children: React.ReactNode;
}) => {
  const { to, extraParam = "" } = props;

  const resolvePageUrl = () => {
    if (to === "homepage") return "/";
    if (extraParam.length === 0) return `/${to}`;
    return `/${to}/${extraParam}`;
  };

  return <StyledLink href={resolvePageUrl()}>{props.children}</StyledLink>;
};

export default AppLink;
