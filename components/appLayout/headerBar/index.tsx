import React from 'react';
import cn from 'classnames';

import Icon from '../../icon';
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
    <LinkWrapper href="/">
      <Icon icon="appLogo" width={138} height={40} />
    </LinkWrapper>
  </div>
);

export default HeaderBar;
