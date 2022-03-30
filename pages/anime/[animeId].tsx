import React from 'react';
import { NextPageContext } from 'next';

import AppLayout from '../../components/appLayout';
import SEO from '../../components/seo';
import AnimeDetailScreen, { AnimeDetailScreenProps } from '../../screens/animeDetail';
import { MEDIA_QUERY } from '../../screens/animeDetail/config';

import { initializeApollo } from '../../lib/apolloClient';
import { APP_BASE_URL } from '../../constants';

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const { animeId } = query;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: MEDIA_QUERY,
    variables: {
      id: Number(animeId),
    },
  });

  const media = data.Media as AnimeDetailScreenProps['media'];

  return {
    props: {
      media,
    },
  };
};

const ScholarsipDetailPage = ({
  media,
}: AnimeDetailScreenProps) => {
  const seoProps = {
    title: `Anime ${media.title.userPreferred}`,
    url: `${APP_BASE_URL}/anime/${media.id}`,
  };

  return (
    <>
      <SEO
        {...seoProps}
      />
      <AppLayout>
        <AnimeDetailScreen
          media={media}
        />
      </AppLayout>
    </>
  );
};

export default ScholarsipDetailPage;
