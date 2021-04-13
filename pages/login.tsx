import { GetStaticProps } from "next";
import React from "react";
import FullWidthContainer from "../components/containers/FullWidthContainer";
import LoginForm from "../components/user/LoginForm";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";
import Head from "next/head";

function LoginPage() {
  return (
    <>
      <Head>
        <title>QC | Login</title>
        <meta name="description" content="Login page to Quacky Clean shop" />
      </Head>

      <FullWidthContainer>
        <LoginForm />
      </FullWidthContainer>
    </>
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

export default withGlobalData(LoginPage);
