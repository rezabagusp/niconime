import React, {
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';

import ErrorState from '../components/error';
import { TextInput, Label, SelectOption } from '../components/input';
import { notify, ToastType } from '../components/toast';
import { LoadingSpinnerScreen } from '../components/loading';
import InifiniteLoader from '../components/infiniteLoader';
import type { Media } from '../types/media';
import type { Option } from '../types/misc';

import {
  MEDIA_PAGE_QUERY,
  GENRES_QUERY,
  YEAR_OPTIONS,
  AIRING_STATUS_OPTIONS,
} from './config';

const HomeScreen = () => {
  const [search, setSearch] = useState<string>('');
  const [genreList, setGenreList] = useState<Option[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Option | null>(null);
  const [selectedYear, setSelectedYear] = useState<Option | null>(null);
  const [selectedAiringStatus, setSelectedAiringStatus] = useState<Option | null>(null);
  const [filter, setFilter] = useState({});

  const isInitialMount = useRef(true);

  const {
    data,
    loading,
    error,
    networkStatus,
    fetchMore,
    refetch,
  } = useQuery(MEDIA_PAGE_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: (err) => {
      notify.show(err, ToastType.ERROR);
    },
  });

  const handleRefetch = useCallback((filter) => {
    refetch({
      search: filter?.search?.length ? filter.search : undefined,
      genres: filter?.selectedGenre ? [filter.selectedGenre.value] : undefined,
      year: filter?.selectedYear ? filter.selectedYear.value : undefined,
      status: filter?.selectedAiringStatus
        ? filter?.selectedAiringStatus.value
        : undefined,
    });
  }, [refetch]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      handleRefetch(filter);
   }
  }, [filter, handleRefetch]);

  const debounceSearch = useDebouncedCallback(
    (searchKeyword: string) => {
      setFilter({
        ...filter,
        search: searchKeyword,
      });
    },
    500,
  );

  useQuery(GENRES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const genreList = data?.genres || [];
      const genreListOptions = genreList.map((genre: string) => ({
        label: genre,
        value: genre,
      }));
      setGenreList(genreListOptions);
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

  const handleChangeSearch = (newVal: string) => {
    setSearch(newVal);
    debounceSearch(newVal);
  };

  const handleChangeGenre = (newGenre: Option | null) => {
    setSelectedGenre(newGenre);
    setFilter({
      ...filter,
      selectedGenre: newGenre,
    });
  };

  const handleChangeYear = (newYear: Option | null) => {
    setSelectedYear(newYear);
    setFilter({
      ...filter,
      selectedYear: newYear,
    });
  };

  const handleChangeStatus = (status: Option | null) => {
    setSelectedAiringStatus(status);
    setFilter({
      ...filter,
      selectedAiringStatus: status,
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
    const mediaList: Media[] = data?.Page?.media ?? [];

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
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <div>
          <Label>Search</Label>
          <TextInput
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeSearch(e.target.value)}
            placeholder="Search anime name"
          />
        </div>
        <div>
          <Label>Genre</Label>
          <SelectOption
            value={selectedGenre}
            onChange={handleChangeGenre}
            options={genreList}
            placeholder="Select Genre"
          />
        </div>
        <div>
          <Label>Year</Label>
          <SelectOption
            value={selectedYear}
            onChange={handleChangeYear}
            options={YEAR_OPTIONS}
            placeholder="Select year"
          />
        </div>
        <div>
          <Label>Airing Status</Label>
          <SelectOption
            value={selectedAiringStatus}
            onChange={handleChangeStatus}
            options={AIRING_STATUS_OPTIONS}
            placeholder="Select airing status"
          />
        </div>
      </div>
      {/* contents */}
      {renderContents()}
    </div>
  );
};

export default HomeScreen;
