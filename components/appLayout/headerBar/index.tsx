import React from 'react';
import cn from 'classnames';

import LinkWrapper from '../../link';

interface Props {
  className?: string,
}

const HeaderBar = ({
  className,
}: Props) => (
  <div
    className={cn(
      'flex items-center justify-between h-14',
      className,
    )}
  >
    <LinkWrapper className="hover:no-underline text-primary-pressed font-bold text-2xl block" href="/">
      Niconime.Tv
    </LinkWrapper>
  </div>
);

export default HeaderBar;
