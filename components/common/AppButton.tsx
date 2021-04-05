import { Button, ButtonProps } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

interface Props {
  inputcolor: string;
}
const StyledButton = styled(Button)<Props>`
  color: ${(props) => props.inputcolor};
`;

export const AppButton = (
  props: ButtonProps & { color?: string; children: React.ReactNode }
) => {
  const { color, ...pass } = props;
  const defaultCol = "#fff";
  return (
    <StyledButton inputcolor={props.color || defaultCol} {...pass}>
      {props.children}
    </StyledButton>
  );
};
