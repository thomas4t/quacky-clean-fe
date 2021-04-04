import { Button, Drawer, IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useAccount } from "../../lib/context/AccountContext";

const DrawerContent = styled.div`
  margin: 15px;
`;

const UserIcon = styled(AccountBoxIcon)`
  color: #fff;
`;

const StyledButton = styled(Button)`
  color: #fff;
`;

export default function LoginDrawer() {
  const account = useAccount();
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
      <StyledButton>
        {account.isLogged ? (
          <span>{account.activeUser}</span>
        ) : (
          <span>Login</span>
        )}
        <UserIcon fontSize="large" />
      </StyledButton>

      {/* <IconButton onClick={() => setIsOpen(true)}>
        
      </IconButton> */}
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerContent>Login stuff here </DrawerContent>
      </Drawer>
    </div>
  );
}
