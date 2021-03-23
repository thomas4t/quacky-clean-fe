import { Button, Drawer, IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const DrawerContent = styled.div`
  margin: 15px;
`;

const UserIcon = styled(AccountBoxIcon)`
  color: #fff;
`;

export default function LoginDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen((open) => !open);
  };

  return (
    <div>
      <span>Login and stuff</span>
      <IconButton onClick={() => setIsOpen(true)}>
        <UserIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerContent>Login stuff here </DrawerContent>
      </Drawer>
    </div>
  );
}
