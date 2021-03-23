import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "../components/common/Loader";
import { Button } from "@material-ui/core";
import AppLink from "../components/common/AppLink";

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
export default function IndexPage() {
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

        {/* This should probably be deleted later */}
        <Button onClick={toggleLoader}>Toggle loader</Button>
        {displayLoader && <Loader />}
      </IndexPageContainer>
    </>
  );
}

// Load product categories
// const url = BACKEND_URL + "/categories";
// console.log(url);
// console.log(appContext.Component);
