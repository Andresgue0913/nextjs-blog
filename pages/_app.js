import "bootstrap/dist/css/bootstrap.min.css";
import 'config/globalStyles.css';
import { Toaster } from 'react-hot-toast';

/**
 * MUI Imports and Configs
 */
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'config/createEmotionCache';
import { useMediaQuery } from '@mui/material';
import React, { useMemo } from 'react';
import { theme } from 'config/theme';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const customTheme = useMemo(() => theme(prefersDarkMode), [prefersDarkMode]);

  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Toaster />
        </ThemeProvider>
      </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};

