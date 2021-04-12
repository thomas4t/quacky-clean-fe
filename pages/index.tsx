import Head from "next/head";
import styled from "styled-components";
import React from "react";
import { GetStaticProps } from "next";
import { getGlobalData, withGlobalData } from "../lib/utils/globalData";
import FullWidthContainer from "../components/containers/FullWidthContainer";
import massiveDuck from "../images/duck.jpg";

const IndexPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainDuckImage = styled("img")`
  width: 50%;
`;

/**
 * This is basically homepage - found at /
 */
function IndexPage() {
  return (
    <>
      <Head>
        <title>Quacky Clean Homepage</title>
        <meta name="description" content="Homepage of our awesome shop" />
      </Head>

      <FullWidthContainer>
        <IndexPageContainer>
          <h1>Welcome to our HOME PAGE!</h1>
          <h2>We sell ducks and other goodies, make sure you look around!</h2>
          <hr />
          <MainDuckImage alt="duck" src={massiveDuck} />
          <span>(this duck will mess you up if u don't)</span>

          <hr />
        </IndexPageContainer>
      </FullWidthContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
