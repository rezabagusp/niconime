import React from 'react';
import cn from 'classnames';

import Image from '../../../components/Image';
import type { CharacterEdge } from '../../../types/character';

import styles from './index.module.css';

interface Props {
  className?: string,
  characterEdge: CharacterEdge,
}

const CharacterCard = ({
  className,
  characterEdge,
}: Props) => (
  <div className={cn(styles.characterCard, className)}>
    <Image
      src={characterEdge.node.image.large}
      width={60}
      height={80}
      alt={characterEdge.node.name.userPreferred}
    />
    <div className={styles['characterCard-overlayTitle']}>
      <div className="absolute top-1/2 -translate-y-1/2 px-1 w-full">
        <p className="line-clamp-3 w-full text-neutral-30 text-center">
          {characterEdge.node.name.userPreferred}
        </p>
      </div>
    </div>
  </div>
);

export default CharacterCard;
