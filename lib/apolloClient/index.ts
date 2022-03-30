import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { IncomingHttpHeaders } from 'http';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const GRAPHQL_SERVER_URL = process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL;

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  // isomorphic fetch for passing the cookies along with each GraphQL request
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => fetch(url, {
      ...init,
      headers: {
        ...init.headers,
      },
  }).then((response) => response);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: GRAPHQL_SERVER_URL, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers
      fetch: enhancedFetch,
    }),
    cache: new InMemoryCache(),
  });
}

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null,
  initialState?: InitialState | null,
}

type InitialState = NormalizedCacheObject | undefined;

export function initializeApollo({ initialState }: IInitializeApollo = {
  headers: null,
  initialState: null,
}): ApolloClient<NormalizedCacheObject> {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any,
): {[key: string]: any} {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: {[key: string]: any}) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo({ initialState: state }), [state]);
  return store;
}
