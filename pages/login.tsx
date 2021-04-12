import { GetStaticProps } from "next";
import React from "react";
import FullWidthContainer from "../components/containers/FullWidthContainer";
import LoginForm from "../components/user/LoginForm";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";

function CategoryPage() {
  return (
    <FullWidthContainer>
      <LoginForm />
    </FullWidthContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getGlobalData();
  return {
    props: {
      ...data,
    },
  };
};

export default withGlobalData(CategoryPage);
