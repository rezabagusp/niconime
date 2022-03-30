import React, { ReactNode } from 'react';
import cn from 'classnames';

import { INTERNAL_ERROR_MESSAGE } from '../../constants';

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
    <div className="flex justify-center font-semibold">
      {text}
    </div>
  </div>
);

export default ErrorState;
