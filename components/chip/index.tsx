import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './index.module.css';

interface Props {
  className?: string,
  children: ReactNode,
  variant?: 'defaultOutline' | 'primaryOutline' | 'primaryMain'
    | 'success' | 'warning'
    | 'blues' | 'fail' | 'grey',
  cursorPointer?: boolean,
  onClick?: () => void,
}

const Chip = ({
  className,
  children,
  variant = 'defaultOutline',
  cursorPointer = false,
  onClick,
}: Props) => {
  const baseClasses: { [key: string]: string } = {
    defaultOutline: styles['chip--defaultOutline'],
    primaryOutline: styles['chip--primaryOutline'],
    primaryMain: styles['chip--primaryMain'],
    success: styles['chip--success'],
    warning: styles['chip--warning'],
    blues: styles['chip--blues'],
    failed: styles['chip--fail'],
    neutral80: styles['chip--grey'],
  };

  const propsClass: { [key: string]: boolean | undefined } = {
    [baseClasses.defaultOutline]: variant === 'defaultOutline',
    [baseClasses.primaryOutline]: variant === 'primaryOutline',
    [baseClasses.primaryMain]: variant === 'primaryMain',
    [baseClasses.success]: variant === 'success',
    [baseClasses.warning]: variant === 'warning',
    [baseClasses.blues]: variant === 'blues',
    [baseClasses.failed]: variant === 'fail',
    [baseClasses.neutral80]: variant === 'grey',
  };

  const chipClass = cn(
    styles.chip,
    propsClass,
    cursorPointer && 'cursor-pointer',
    className,
  );

  return (
    <div className={chipClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Chip;
