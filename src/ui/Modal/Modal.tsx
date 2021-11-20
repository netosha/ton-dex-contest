import React from 'react';

import { XIcon } from '@heroicons/react/solid';
import cn from 'clsx';
import ReactDOM from 'react-dom';

import { useOutsideClick } from '@src/utils';

import { ModalProps } from './Modal.types';

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { children, isOpen, onClose, onOutsideClick, heading, className } =
    props;
  useOutsideClick(modalRef, onOutsideClick ?? onClose);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose?.();
      }
    };
    document?.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  // The modal uses React portals.
  // Portals only work on the client-side, because they need a DOM element. For this reason, the modal is not rendered on the server.
  if (typeof window === 'undefined') {
    return null;
  }

  if (!document.getElementById('modal-root')) {
    const portalRoot = document.createElement('div');
    portalRoot.id = 'modal-root';
    document.body.appendChild(portalRoot);
  }

  if (!isOpen) return null;

  document.body.style.overflow = 'hidden';

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="flex fixed top-0 left-0 justify-center items-center py-4 w-screen h-screen bg-overlay"
    >
      <div
        ref={modalRef}
        className={cn(
          className,
          'flex p-6 flex-col min-h-[20rem] max-h-[80vh] overflow-y-auto bg-white rounded-lg relative',
          'min-w-[90vw] md:min-w-[30rem]'
        )}
      >
        {heading && (
          <p className="mb-2 text-2xl font-extrabold text-violet">{heading}</p>
        )}
        {children}
        {onClose && (
          <button className="absolute top-7 right-7" onClick={onClose}>
            <XIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
});

Modal.displayName = 'Modal';

export default Modal;
