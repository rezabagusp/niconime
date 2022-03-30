import React, { ReactNode } from 'react';
import cn from 'classnames';

import { INTERNAL_ERROR_MESSAGE } from '../../constants';

// 512 x 512. ratio 1:1
const ERROR_IMAGE_URL = 'https://s3.ap-southeast-3.amazonaws.com/cdn.stading.bangun.app/documents//1643569986353';

interface Props {
  className?: string,
  text?: ReactNode,
}

const ErrorState = ({
  className,
  text = INTERNAL_ERROR_MESSAGE,
}: Props) => (
  <div
    className={cn(
      'py-6',
      className,
    )}
  >
    <div
      className="relative w-full h-full"
      style={{ paddingBottom: '100%' }}
    >
      <div
        className="absolute top-0 left-0 right-0 w-full h-full bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${ERROR_IMAGE_URL})` }}
      />
    </div>
    <div className="flex justify-center font-bold">
      {text}
    </div>
  </div>
);

export default ErrorState;
