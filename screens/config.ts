import { gql } from '@apollo/client';

import { MEDIA_ATTRIBUTES } from '../graphql/fragment/media';
import { getYearList } from '../lib/utils';
import type { Option } from '../types/misc';

export const MEDIA_PAGE_QUERY = gql`
  query (
    $page: Int = 1,
    $perPage: Int = 20,
    $id: Int,
    $type: MediaType,
    $isAdult: Boolean = false,
    $search: String,
    $format: [MediaFormat],
    $status: MediaStatus,
    $countryOfOrigin: CountryCode,
    $source: MediaSource,
    $season: MediaSeason,
    $seasonYear: Int,
    $year: String,
    $onList: Boolean,
    $yearLesser: FuzzyDateInt,
    $yearGreater: FuzzyDateInt,
    $episodeLesser: Int,
    $episodeGreater: Int,
    $durationLesser: Int,
    $durationGreater: Int,
    $chapterLesser: Int,
    $chapterGreater: Int,
    $volumeLesser: Int,
    $volumeGreater: Int,
    $licensedBy: [Int],
    $isLicensed: Boolean,
    $genres: [String],
    $excludedGenres: [String],
    $tags: [String],
    $excludedTags: [String],
    $minimumTagRank: Int,
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        id: $id,
        type: $type,
        season: $season,
        format_in: $format,
        status: $status,
        countryOfOrigin: $countryOfOrigin,
        source: $source,
        search: $search,
        onList: $onList,
        seasonYear: $seasonYear,
        startDate_like: $year,
        startDate_lesser: $yearLesser,
        startDate_greater: $yearGreater,
        episodes_lesser: $episodeLesser,
        episodes_greater: $episodeGreater,
        duration_lesser: $durationLesser,
        duration_greater: $durationGreater,
        chapters_lesser: $chapterLesser,
        chapters_greater: $chapterGreater,
        volumes_lesser: $volumeLesser,
        volumes_greater: $volumeGreater,
        licensedById_in: $licensedBy,
        isLicensed: $isLicensed,
        genre_in: $genres,
        genre_not_in: $excludedGenres,
        tag_in: $tags,
        tag_not_in: $excludedTags,
        minimumTagRank: $minimumTagRank,
        sort: $sort,
        isAdult: $isAdult
      ) {
        ...mediaAttributes
      }
    }
  }
  ${MEDIA_ATTRIBUTES}
`;

export const GENRES_QUERY = gql`
  query {
    genres: GenreCollection
  }
`;

export const YEAR_OPTIONS: Option[] = getYearList(undefined, 0).map((year) => ({
  value: year,
  label: `${year}`,
}));

export const AIRING_STATUS_OPTIONS: Option[] = [
  {
    value: 'FINISHED',
    label: 'Finished',
  },
  {
    value: 'RELEASING',
    label: 'Releasing',
  },
  {
    value: 'NOT_YET_RELEASED',
    label: 'Not Yet Released',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
  },
];
