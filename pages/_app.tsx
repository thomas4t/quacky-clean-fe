import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import ResponsiveLayout from "../components/common/ResponsiveLayout";
import Head from "next/head";
import { Slide, StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { theme } from "../lib/utils/theme";
import ContextProvider from "../lib/context";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>QC E-shop</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Slide}
            autoHideDuration={1500}
          >
            <ContextProvider>
              <ResponsiveLayout>
                <Component {...pageProps} />
              </ResponsiveLayout>
            </ContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default MyApp;
