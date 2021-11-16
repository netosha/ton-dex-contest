import React from 'react';

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
