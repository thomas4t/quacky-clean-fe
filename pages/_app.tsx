import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import ResponsiveLayout from "../components/common/ResponsiveLayout";
import Head from "next/head";
import { StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { theme } from "../lib/utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* This isnt implemented yet (state management) */}
          {/* <ContextProvider> */}
          <ResponsiveLayout>
            <Component {...pageProps} />
          </ResponsiveLayout>
          {/* </ContextProvider> */}
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default MyApp;
