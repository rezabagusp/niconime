import React from 'react';
import ReactDOM from 'react-dom';
import ToastCard from './card';
import {
  TOAST_WRAPPER_ID,
  DEFAULT_TOAST_TIMEOUT,
  ToastMessage,
  ToastType,
} from './config';
import Container from './container';

const DefaultServerErrorMessage: ToastMessage = (
  <span>
    Internal server error. Please try again or hit
    <span className="font-bold"> Refresh</span>
  </span>
);

let timer: any;

const hide = (): void => {
  const target: any = document.getElementById(TOAST_WRAPPER_ID);
  ReactDOM.unmountComponentAtNode(target);
  clearInterval(timer);
};

const renderToast = (message: ToastMessage, type: ToastType): void => {
  const target = document.getElementById(TOAST_WRAPPER_ID);
  ReactDOM.render(
    <ToastCard
      message={message}
      type={type}
      onClose={() => hide()}
    />,
    target,
  );
};

const show = (message: ToastMessage, type: ToastType): boolean => {
  if (!document.getElementById(TOAST_WRAPPER_ID)?.hasChildNodes()) {
    renderToast(message || DefaultServerErrorMessage, type);

    timer = setTimeout(() => {
      hide();
    }, DEFAULT_TOAST_TIMEOUT);
  }

  return false;
};

export const notify = {
  show,
  hide,
};
export { ToastType };
export type { ToastMessage };
export default Container;
