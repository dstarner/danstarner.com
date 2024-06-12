import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import "react-image-gallery/styles/css/image-gallery.css";
import theme from "src/theme";
import createEmotionCache from "src/createEmotionCache";
import "src/styles.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="keywords"
          content="developer, blog, portfolio, resume, software, engineer"
        />
        <meta name="author" content="Dan Starner" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://danstarner.com/" />
        <meta name="twitter:title" key="twitter:title" content="Dan Starner" />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="My Head is in the Clouds 24/7"
        />
        <meta
          name="twitter:image"
          content="https://danstarner.com/img/twitter-card.png"
        />
        <meta name="twitter:creator" content="@dan_starner" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://danstarner.com/img/og-card.png"
        />
        <meta property="og:title" key="og:title" content="Dan Starner" />
        <meta
          property="og:description"
          key="og:description"
          content="My Head is in the Clouds 24/7"
        />
        <meta property="og:url" content="https://danstarner.com/" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
