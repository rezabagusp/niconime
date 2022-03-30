export type MediaTitle = {
  romaji: string,
  english: string,
  native: string,
  userPreferred: string,
};

export type MediaType = 'ANIME' | 'MANGA';

export type MediaCoverImage = {
  extraLarge: string,
  large: string,
  color: string,
};

export type FuzzyDate = {
  year: number,
  month: number,
  day: number,
};

export type MediaSeason = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';

export type MediaFormat = 'TV' | 'TV_SHORT' | 'MOVIE' | 'SPECIAL' | 'OVA' | 'ONA'
  | 'MUSIC' | 'MANGA' | 'NOVEL' | 'ONE_SHOT';

export type MediaStatus = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED'
  | 'CANCELLED' | 'HIATUS';

export type Media = {
  id: number,
  title: MediaTitle,
  coverImage: MediaCoverImage,
  startDate: FuzzyDate,
  endDate: FuzzyDate,
  bannerImage: string,
  season: MediaSeason,
  seasonYear: number,
  description: string,
  type: MediaType,
  status: MediaStatus,
  episodes: number,
  duration: number,
  genres: string[],
  isAdult: boolean,
  averageScore: number,
  popularity: number,
  studios: {
    edges: {
      isMain: boolean,
      node: {
        id: number,
        name: string,
      },
    },
  },
};
