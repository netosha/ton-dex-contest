import { HTMLAttributes, MouseEventHandler } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: MouseEventHandler<SVGElement>;
  onOutsideClick?: MouseEventHandler<HTMLDivElement>;

  overlayProps?: HTMLAttributes<HTMLDivElement>;
}
