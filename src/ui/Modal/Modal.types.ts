import { HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  onOutsideClick?: () => void;

  heading?: ReactNode;

  overlayProps?: HTMLAttributes<HTMLDivElement>;
}
