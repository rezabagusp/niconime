import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from '../index.module.css';

type Props = {
  tabIndex?: number | undefined,
  children: ReactNode,
  isActive?: boolean,
  onTabClick?: (index: number) => void,
  className?: string,
};

const Tab = ({
  children,
  tabIndex,
  isActive = false,
  onTabClick,
  className,
}: Props) => (
  <li
    onClick={() => {
      if (onTabClick != null) {
        onTabClick(tabIndex ?? 0);
      }
    }}
    className={cn(
      styles['tabs-listItem'],
      'inline-block cursor-pointer py-3 px-2',
      { [styles['is-active']]: isActive },
      className,
    )}
  >
    {children}
  </li>
);

export default Tab;
