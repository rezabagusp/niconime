import { gql } from '@apollo/client';

export const MEDIA_ATTRIBUTES = gql`
  fragment mediaAttributes on Media {
    id
    seasonYear
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    season
    seasonYear
    description
    type
    format
    status(version: 2)
    episodes
    duration
    genres
    isAdult
    averageScore
    popularity
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
  }
`;
