import React from 'react';
import cn from 'classnames';

import Image from '../../../components/Image';
import type { Media } from '../../../types/media';

import styles from './index.module.css';
import LinkWrapper from '../../../components/link';

interface Props {
  className?: string,
  media: Media,
}

const RelationMediaCard = ({
  className,
  media,
}: Props) => (
  <div className={cn(styles.relationMediaCard, className)}>
    <LinkWrapper
      href={`/anime/${media.id}`}
    >
      <Image
        src={media.coverImage.large}
        width={85}
        height={115}
        alt={media.title.userPreferred}
      />
      <div className={styles['relationMediaCard-overlayTitle']}>
        <div className="absolute top-1/2 -translate-y-1/2 px-1 w-full">
          <p className="line-clamp-3 w-full text-neutral-30 text-center">
            {media.title.userPreferred}
          </p>
        </div>
      </div>
    </LinkWrapper>
  </div>
);

export default RelationMediaCard;
