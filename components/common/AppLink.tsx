import styled from "styled-components";
import Link from "next/link";
import { AppPagesNames } from "../../lib/types/core";
import React from "react";

const StyledLink = styled(Link)`
  a {
    text-decoration: underline;
    color: ${(props) => props.theme.linkCol};
    :hover {
      color: ${(props) => props.theme.primary};
      opacity: 90%;
    }
  }
`;

const AppLink = (props: {
  to: AppPagesNames;
  extraParam?: string;
  children: React.ReactNode;
}) => {
  const { to, extraParam = "", ...pass } = props;

  const resolvePageUrl = () => {
    if (to === "homepage") return "/";
    if (extraParam.length === 0) return `/${to}`;
    return `/${to}/${extraParam}`;
  };

  return (
    <StyledLink href={resolvePageUrl()} {...pass}>
      {props.children}
    </StyledLink>
  );
};

export default AppLink;
