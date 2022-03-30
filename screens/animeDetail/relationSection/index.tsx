import React from 'react';
import cn from 'classnames';

import type { Media } from '../../../types/media';

import RelationMediaCard from '../relationAnimeCard';

interface Props {
  className?: string,
  media: Media,
}

const RelationSection = ({
  className,
  media,
}: Props) => {
  const { relations } = media;
  const relationMediaList = relations.nodes || [];

  const filteredRelationMediaList = relationMediaList.filter((item) => item.type === 'ANIME');

  if (!filteredRelationMediaList.length) {
    return null;
  }

  const renderRelationList = () => filteredRelationMediaList.map((item: Media) => {
    const key = item.id;

    return (
      <RelationMediaCard
        key={key}
        media={item}
      />
    );
  });

  return (
    <div className={cn(className)}>
      <h2 className="text-sm font-semibold">
        Related Anime
      </h2>
      <div className="grid gap-4 grid-cols-3 md:grid-cols-5 mt-2">
        {renderRelationList()}
      </div>
    </div>
  );
};

export default RelationSection;
