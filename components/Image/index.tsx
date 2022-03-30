import React, { ReactElement, useState } from 'react';
import { InView } from 'react-intersection-observer';
import cn from 'classnames';

interface Props {
  className?: string,
  classNameImg?: string,
  width: number,
  height: number,
  src: string,
  lazy?: boolean,
  alt?: string,
}

const Img = ({
  className,
  classNameImg,
  width,
  height,
  src,
  lazy = true,
  alt,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const ratio = (height / width) * 100;

  const handleChange = (Inview: boolean) => {
    if (Inview) {
      setImageLoaded(true);
    }
  };

  const renderFigure = (): ReactElement => (
    <figure className="relative block m-0">
      <picture
        className={cn('block h-full', className)}
        style={{ paddingBottom: `${ratio}%` }}
      >
        <img
          src={src}
          className={cn('absolute top-0 left-0 w-full h-full object-cover object-center overflow-hidden', classNameImg)}
          alt={alt}
          width={width}
          height={height}
        />
      </picture>
      { alt && (
        <figcaption className="absolute invisible overflow-hidden max-w-full">
          {alt}
        </figcaption>
      )}
    </figure>
  );

  if (lazy) {
    if (!imageLoaded) {
      return (
        <InView
          onChange={handleChange}
        >
          <div />
        </InView>
      );
    }

    return renderFigure();
  }

  return renderFigure();
};

export default Img;
