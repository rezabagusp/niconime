import React from 'react';

import type { Media } from '../../types/media';

import MetaInfoSection from './MetaInfoSection';
import RelationSection from './relationSection';
import CharacterSection from './characterSection';

export interface AnimeDetailScreenProps {
  media: Media,
}

const AnimeDetailScreen = ({
  media,
}: AnimeDetailScreenProps) => (
  <div className="px-4">
    <MetaInfoSection media={media} />
    <h1 className="text-xl font-semibold mt-5">
      {media.title.userPreferred}
    </h1>
    <div
      className="mt-5 text-sm"
      dangerouslySetInnerHTML={{ __html: media.description }}
    />
    <RelationSection className="mt-5" media={media} />
    <CharacterSection className="mt-5" media={media} />
  </div>
);

export default AnimeDetailScreen;
