import React from 'react';
import cn from 'classnames';

import { breakpoint } from '../../../constants/breakpoint';
import Image from '../../Image';
import LinkWrapper from '../../link';
import type { Media } from '../../../types/media';

import styles from './index.module.css';

interface Props {
  className?: string,
  media: Media,
}

const MediaAnimeCard = ({
  className,
  media,
}: Props) => {
  const href = `/anime/${media.id}`;

  const isDekstop = window.matchMedia(`(min-width: ${breakpoint.md}px)`).matches;

  return (
    <div
      className={cn(
        styles.mediaAnimeCard,
        className,
      )}
    >
      <LinkWrapper
        className="block hover:no-underline"
        href={href}
      >
        <Image
          className={styles['mediaAnimeCard-image']}
          src={
            isDekstop
              ? media.coverImage.extraLarge
              : media.coverImage.large
          }
          width={126}
          height={180}
          alt={media.title.userPreferred}
        />
        <h3 className="mt-2 text-xs md:text-sm line-clamp-2">
          {media.title.userPreferred}
        </h3>
      </LinkWrapper>
    </div>
  );
};

export default MediaAnimeCard;
