import { GetStaticProps } from "next";
import React from "react";
import styled from "styled-components";
import { AppButton } from "../components/common/AppButton";
import Loader from "../components/common/Loader";
import FullWidthContainer from "../components/containers/FullWidthContainer";
import LoginForm from "../components/user/LoginForm";
import { useAccount } from "../lib/context/AccountContext";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";

function CategoryPage(props: {}) {
  return (
    <FullWidthContainer>
      <LoginForm />
    </FullWidthContainer>
  );
}

// New version of getInitialdata
export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getGlobalData();
  return {
    props: {
      ...data,
    },
  };
};

export default withGlobalData(CategoryPage);
