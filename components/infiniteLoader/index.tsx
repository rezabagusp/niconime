import React from 'react';
import { InView } from 'react-intersection-observer';
import { LoadingSpinnerScreen } from '../loading';

interface Props {
  className?: string,
  hasMoreData: boolean,
  onIntersect?: () => void,
  loading: boolean,
  size?: 'small' | 'medium',
}

const InifiniteLoader = ({
  className,
  hasMoreData,
  onIntersect,
  loading,
  size = 'medium',
}: Props) => {
  const handleChange = (inView: boolean) => {
    if (inView && !loading) {
      if (onIntersect) {
        onIntersect();
      }
    }
  };

  if (!hasMoreData) {
    return null;
  }

  return (
    <InView
      onChange={handleChange}
      rootMargin="24px 0px"
    >
      <LoadingSpinnerScreen
        className={className}
        size={size}
      />
    </InView>
  );
};

export default InifiniteLoader;
