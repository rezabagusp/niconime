import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Icon from '../../icon';
import { DEFAULT_TOAST_TIMEOUT, ToastMessage, ToastType } from '../config';
import styles from './index.module.css';

type Props = {
  message?: ToastMessage,
  type?: ToastType,
  onClose: () => void,
};

const COLOR = {
  error: '!text-[#F55151]',
  success: '!text-[#AFE19F]',
  warning: '!text-secondary-main',
};

const ToastCard = ({
  message = 'Toast!',
  type = ToastType.SUCCESS,
  onClose,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    timer = setTimeout(() => { // eslint-disable-line
      setShow(true);
    }, 100);

    timer = setTimeout(() => {
      setShow(false);
    }, DEFAULT_TOAST_TIMEOUT);

    return () => clearTimeout(timer);
  }, []);

  const classes: string = cn(
    styles.toastBar,
    {
      'bg-[#35801D]': type === ToastType.SUCCESS,
      'bg-[#FFEAEA]': type === ToastType.ERROR,
      'bg-secondary-surface': type === ToastType.WARNING,
    },
    !show && styles['toastBar--hiding'],
    show && styles['toastBar--showing'],
  );

  return (
    <div className={classes}>
      <div className="w-full h-full flex justify-between">
        <div className="flex">
          <div className="min-w-[14px] mt-[1px]">
            <Icon
              className={cn(
                type === ToastType.SUCCESS && COLOR.success,
                type === ToastType.ERROR && COLOR.error,
                type === ToastType.WARNING && COLOR.warning,
              )}
              icon="roundedInfo"
              size={14}
            />
          </div>
          <div
            className={cn(
              'text-xs font-normal line-clamp3 px-2',
              type === ToastType.SUCCESS && COLOR.success,
              type === ToastType.ERROR && COLOR.error,
              type === ToastType.WARNING && COLOR.warning,
            )}
          >
            {message}
          </div>
        </div>
        <div className="min-w-[16px]" onClick={onClose}>
          <Icon
            className={cn(
              type === ToastType.SUCCESS && COLOR.success,
              type === ToastType.ERROR && COLOR.error,
              type === ToastType.WARNING && COLOR.warning,
            )}
            icon="close"
            size={16}
            cursorPointer
          />
        </div>
      </div>
    </div>
  );
};

export default ToastCard;
