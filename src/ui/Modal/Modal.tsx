import React from 'react';

import { XIcon } from '@heroicons/react/solid';
import ReactDOM from 'react-dom';

import { useOutsideClick } from '@src/utils';

import { ModalProps } from './Modal.types';

// eslint-disable-next-line react-hooks/rules-of-hooks
const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  // Prevent Server Side Rendering
  // https://github.com/reactjs/react-modal/issues/580

  const modalRef = React.useRef<HTMLDivElement>(null);
  const { children, isOpen, onClose, onOutsideClick, heading } = props;
  useOutsideClick(modalRef, onOutsideClick ?? onClose);

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
      className="fixed top-0 left-0 bg-overlay h-screen w-screen flex items-center justify-center"
    >
      <div
        ref={modalRef}
        className="flex p-6 flex-col min-h-[20rem] min-w-[30rem] max-h-[80vh] overflow-y-auto bg-white rounded-lg relative"
      >
        {heading && (
          <p className="text-2xl mb-2 font-extrabold text-violet">{heading}</p>
        )}
        {children}
        <button className="absolute right-7 top-7" onClick={onClose}>
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
});

Modal.displayName = 'Modal';

export default Modal;
