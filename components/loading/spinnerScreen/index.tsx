import React from 'react';
import cn from 'classnames';
import LoadingSpinner from '../spinner';

interface Props {
  className?: string,
  size?: 'medium' | 'small',
}

const LoadingSpinnerScreen = ({
  className,
  size,
}: Props) => (
  <div
    className={cn(
      'flex w-full justify-center',
      className,
    )}
  >
    <LoadingSpinner size={size} />
  </div>
);

export default LoadingSpinnerScreen;
