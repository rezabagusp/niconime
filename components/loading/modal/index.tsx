import React, { useContext } from 'react';

import { storeContext } from '../../../store';
import ModalBase from '../../modal';
import LoadingSpinner from '../spinner';

const LoadingModal = () => {
  const { loadingModal } = useContext(storeContext);

  if (!loadingModal) {
    return null;
  }

  return (
    <ModalBase className="top-1/2 -translate-y-1/2">
      <div className="text-neutral-10">
        <div className="flex justify-center">
          <LoadingSpinner
            className="mb-4"
            color="neutral10"
            size="medium"
          />
        </div>
        <div className="text-center">
          Loading...
        </div>
      </div>
    </ModalBase>
  );
};

export default LoadingModal;
