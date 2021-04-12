import { Drawer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { AppButton } from "../common/AppButton";
import { useAccount } from "../../lib/context/AccountContext";

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  height: 100%;
  min-width: 300px;
`;

const TopMarginFiller = styled.div`
  margin-top: auto;
`;

const UserIcon = styled(AccountBoxIcon)`
  color: #fff;
`;

export default function AccountDrawer() {
  const { activeUser, logout } = useAccount();
  const [isOpen, setIsOpen] = React.useState(false);

  const onLogout = async () => {
    setIsOpen(false);
    // Fake timeout to improve UX
    setTimeout(() => {
      logout();
    }, 350);
  };

  return (
    <div>
      <AppButton onClick={() => setIsOpen(true)}>
        My account
        <UserIcon fontSize="large" />
      </AppButton>

      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerContent>
          <div>
            Current user: <strong>{activeUser}</strong>
          </div>
          <div>
            email: <strong>not yet implemented</strong>
          </div>
          <div>
            phone: <strong>not yet implemented</strong>
          </div>

          <TopMarginFiller />

          <AppButton onClick={onLogout} color="secondary" variant={"outlined"}>
            <strong>LOGOUT</strong>
          </AppButton>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
