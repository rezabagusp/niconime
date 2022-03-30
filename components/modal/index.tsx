import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import cn from 'classnames';

type Props = {
  className?: string,
  children: ReactNode,
  onClose?: () => void,
};

const ModalBase: FunctionComponent<Props> = ({ className, children, onClose }) => {
  const handleKeyDown = useCallback((e): void => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (onClose) {
        onClose();
      }
    }
  }, [onClose]);

  useEffect((): () => void => {
    const body = document.body;
    if (body) body.classList.add('overflow-hidden');

    return () => {
      if (body) body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (onClose != null) document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      if (onClose != null) document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onClose, handleKeyDown]);

  const handleClose = (e: any): void => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="z-20 fixed top-0 left-0 right-0 w-full h-screen overflow-y-scroll bg-neutral-80 bg-opacity-80"
    >
      <div
        className="fixed top-0 left-0 w-full h-full"
        onClick={handleClose}
      />
      <div className={cn('relative max-w-md mx-auto', className)}>
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
