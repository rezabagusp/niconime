import React from 'react';
import cn from 'classnames';

import type { Media } from '../../../types/media';
import type { CharacterEdge } from '../../../types/character';

import CharacterCard from '../characterCard';

interface Props {
  className?: string,
  media: Media,
}

const CharacterSection = ({
  className,
  media,
}: Props) => {
  const { characters } = media;
  const charactersList = characters.edges || [];

  if (!charactersList.length) {
    return null;
  }

  const renderCharacterList = () => charactersList.map((item: CharacterEdge) => {
    const key = item.id;

    return (
      <CharacterCard
        key={key}
        characterEdge={item}
      />
    );
  });

  return (
    <div className={cn(className)}>
      <h2 className="text-sm font-semibold">
        Characters
      </h2>
      <div className="grid gap-4 grid-cols-4 md:grid-cols-6 mt-2">
        {renderCharacterList()}
      </div>
    </div>
  );
};

export default CharacterSection;
