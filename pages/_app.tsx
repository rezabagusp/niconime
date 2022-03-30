import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';

import { AppStateWrapper, appInitialState } from '../store';
import { useApollo } from '../lib/apolloClient';
import ToastWrapper from '../components/toast';
import { LoadingModal } from '../components/loading';
import '../styles/globals.css';

const ProgressBar = dynamic(() => import('../components/progressBar'), { ssr: false });

const MyApp = ({
  Component,
  pageProps,
}: AppProps): ReactNode => {
  const apolloClient = useApollo(pageProps);

  const appStateWrapperProps = {
    initialState: {
      ...appInitialState,
      userInfo: pageProps.userInfo || null,
    },
  };

  return (
    <ApolloProvider client={apolloClient}>
      <AppStateWrapper {...appStateWrapperProps}>
        <Component {...pageProps} />
        <LoadingModal />
      </AppStateWrapper>
      <ToastWrapper />
      <ProgressBar />
    </ApolloProvider>
  );
};

export default MyApp;
