import { ReactNode } from 'react';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export type ToastMessage = string | ReactNode;

export const TOAST_WRAPPER_ID = 'toast-wrapper';
export const DEFAULT_TOAST_TIMEOUT = 5000;
