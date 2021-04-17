import React from "react";
import FullWidthContainer from "../components/containers/FullWidthContainer";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";
import { GetStaticProps } from "next";
import Head from "next/head";
import RegisterForm from "../components/user/RegisterForm";

function LoginPage() {
  return (
    <>
      <Head>
        <title>QC | Registration</title>
        <meta
          name="description"
          content="Registration page to Quacky Clean shop"
        />
      </Head>

      <FullWidthContainer>
        <RegisterForm />
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
