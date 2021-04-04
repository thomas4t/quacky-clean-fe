import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "../components/common/Loader";
import { Button } from "@material-ui/core";
import { GetStaticProps } from "next";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";
import webClient from "../lib/utils/webClient";
import { localStorageApi } from "../lib/utils/localStorage";
import { SmsOutlined } from "@material-ui/icons";
import { useAccount } from "../lib/context/AccountContext";

const IndexPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainDuckImage = styled(Image)`
  width: 70%;
`;

/**
 * This is basically homepage - found at /
 */
function IndexPage() {
  const account = useAccount();
  const [displayLoader, setDisplayLoader] = useState(false);

  const toggleLoader = () => {
    setDisplayLoader((currVal) => !currVal);
  };

  return (
    <>
      <Head>
        <title>Quacky Clean Homepage</title>
        <meta name="description" content="Homepage of our awesome shop" />
      </Head>

      <IndexPageContainer>
        <h1>Welcome to our HOME PAGE!</h1>
        <h2>We sell ducks and other goodies, make sure you look around!</h2>
        <MainDuckImage alt="duck" src="/duck.jpg" width={700} height={400} />
        <span>(this duck will mess you up if u don't)</span>
        <hr />
        <button
          onClick={async () => {
            // console.log(localStorageApi.getValue("token"));
            try {
              const res = await webClient.get("/cart");
              console.log(res);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          send req to cart
        </button>
        <button
          onClick={async () => {
            // console.log(localStorageApi.getValue("token"));
            try {
              const res = account.login({
                username: "tomas",
                password: "tomas",
              });
              console.log(res);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          login
        </button>
        <button onClick={account.logout}>Logout</button>
        {/* This should probably be deleted later */}
        <Button onClick={toggleLoader}>Toggle loader</Button>
        {displayLoader && <Loader />}
      </IndexPageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getGlobalData();
  return {
    props: { ...data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1,
  };
};

export default withGlobalData(IndexPage);
