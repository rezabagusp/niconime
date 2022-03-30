import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './index.module.css';

interface Props {
  className?: string,
  children: ReactNode,
  onClick?: () => void,
}

const Paper = ({
  className,
  children,
  onClick,
}: Props) => (
  <div
    className={cn(
      styles.paper,
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Paper;
