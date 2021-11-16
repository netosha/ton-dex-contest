import React from 'react';

const useOutsideClick = (
  ref: React.RefObject<any>,
  onClick: React.MouseEventHandler<any> | undefined
) => {
  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!ref?.current) return;
      if (!ref.current.contains(e.target)) {
        onClick?.(e);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
};

export default useOutsideClick;
