import React, { useState, ChangeEvent } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';

import ErrorState from '../components/error';
import { TextInput, Label } from '../components/input';
import { notify, ToastType } from '../components/toast';
import { LoadingSpinnerScreen } from '../components/loading';
import InifiniteLoader from '../components/infiniteLoader';
import type { Media } from '../types/media';

import { MEDIA_LISTING_QUERY } from './config';

const HomeScreen = () => {
  const [search, setSearch] = useState<string>('');

  const {
    data,
    loading,
    error,
    networkStatus,
    fetchMore,
    // refetch,
  } = useQuery(MEDIA_LISTING_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: (err) => {
      notify.show(err, ToastType.ERROR);
    },
  });

  const handleFetchMore = ():void => {
    fetchMore({
      variables: {
        page: data.Page.pageInfo.currentPage + 1,
      },
      updateQuery: (
        previousResult: { [x: string]: any },
        { fetchMoreResult }: { [x: string]: any },
      ) => {
        const prevMedia = previousResult?.Page?.media || [];
        const newMedia = fetchMoreResult?.Page?.media || [];

        return {
          ...fetchMoreResult,
          Page: {
            ...fetchMoreResult.Page,
            media: [
              ...prevMedia,
              ...newMedia,
            ],
          },
        };
      },
    });
  };

  const renderInfiniteLoader = () => (
    <InifiniteLoader
      hasMoreData={!!data?.Page?.pageInfo?.hasNextPage}
      loading={loading}
      onIntersect={() => handleFetchMore()}
    />
  );

  const renderAnimeList = () => {
    const mediaList: Media[] = data.Page.media ?? [];

    if (!mediaList.length) {
      return (
        <ErrorState text="No Anime found." />
      );
    }

    return (
      <div>
        {
          mediaList.map((media) => {
            const key = media.id;

            return (
              <div key={key}>
                {`card-${key}`}
              </div>
            );
          })
        }
        {renderInfiniteLoader()}
      </div>
    );
  };

  const renderContents = () => {
    if (error) {
      return <ErrorState />;
    }

    if (loading && networkStatus !== NetworkStatus.fetchMore) {
      return (
        <LoadingSpinnerScreen />
      );
    }

    return renderAnimeList();
  };

  return (
    <div className="px-4">
      <h1 className="font-semibold text-xl">Browse Anime</h1>
      {/* filter */}
      <div className="mt-5">
        <div>
          <Label>Search</Label>
          <TextInput
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Label>Search</Label>
          <TextInput
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* contents */}
      {renderContents()}
    </div>
  );
};

export default HomeScreen;
