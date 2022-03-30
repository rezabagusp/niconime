import React, { ReactNode } from 'react';
import cn from 'classnames';
import { format as formatDate } from 'date-fns';

import Image from '../../../components/Image';
import type { Media } from '../../../types/media';

interface MetaInfoProps {
  className?: string,
  children: ReactNode,
}

const MetaInfoTitle = ({
  className,
  children,
}: MetaInfoProps) => (
  <div className={cn('font-semiBold text-sm', className)}>
    {children}
  </div>
);

const MetaInfoContent = ({
  className,
  children,
}: MetaInfoProps) => (
  <div className={cn('text-sm text-neutral-70', className)}>
    {children}
  </div>
);

interface Props {
  className?: string,
  media: Media,
}

const MetaInfoSection = ({
  className,
  media,
}: Props) => {
  const {
    format,
    episodes,
    duration,
    status,
    startDate,
    endDate,
    season,
    seasonYear,
    averageScore,
    popularity,
    title,
    coverImage,
  } = media;

  const formattedStartDate = formatDate(new Date(`${startDate.year}-${startDate.month}-${startDate.day}`), 'MM, dd yyyy');
  const formattedEndDate = formatDate(new Date(`${endDate.year}-${endDate.month}-${endDate.day}`), 'MM, dd yyyy');

  return (
    <div className={cn(className)}>
      <div className="md:flex md:justify-center">
        <div>
          <div className="min-w-[215px] mx-auto">
            <Image
              className="rounded-lg"
              classNameImg="rounded-lg"
              src={coverImage.extraLarge}
              width={215}
              height={303}
              alt={title.userPreferred}
            />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-3 md:grid-cols-6 mt-5 md:ml-10 h-fit">
          <div>
            <MetaInfoTitle>
              Format
            </MetaInfoTitle>
            <MetaInfoContent>
              {format}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Episodes
            </MetaInfoTitle>
            <MetaInfoContent>
              {episodes}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Duration
            </MetaInfoTitle>
            <MetaInfoContent>
              {`${duration} minutes`}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Airing Status
            </MetaInfoTitle>
            <MetaInfoContent>
              {status}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Start Date
            </MetaInfoTitle>
            <MetaInfoContent>
              {formattedStartDate}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              End Date
            </MetaInfoTitle>
            <MetaInfoContent>
              {formattedEndDate}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Season
            </MetaInfoTitle>
            <MetaInfoContent>
              {`${season} ${seasonYear}`}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Average Score
            </MetaInfoTitle>
            <MetaInfoContent>
              {`${averageScore}%`}
            </MetaInfoContent>
          </div>
          <div>
            <MetaInfoTitle>
              Popularity
            </MetaInfoTitle>
            <MetaInfoContent>
              {popularity}
            </MetaInfoContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaInfoSection;
