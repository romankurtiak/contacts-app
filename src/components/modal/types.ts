import { ReactNode } from 'react';

export type ModalProps = {
  isVisible: boolean;
  title: string;
  children?: ReactNode;
  setIsVisible: (visible: boolean) => void;
};
