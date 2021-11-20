import React from 'react';

function useOutsideClick<T>(
  ref: React.RefObject<T>,
  onClick: (e: MouseEvent) => void
): void;

function useOutsideClick<T>(
  ref: React.RefObject<T>[],
  onClick: (e: MouseEvent) => void
): void;

function useOutsideClick<T extends Element>(
  ref: React.RefObject<T> | React.RefObject<T>[],
  onClick: (e: MouseEvent) => void
): void {
  React.useEffect(() => {
    // For multiple refs
    if (Array.isArray(ref)) {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref?.some((x) => !x.current)) return;
        const clickOnElement = ref.some((r) =>
          r.current?.contains(e.target as Element)
        );
        if (!clickOnElement) onClick?.(e as MouseEvent);
      };
      document.addEventListener('mousedown', handleClickOutside);
      // eslint-disable-next-line consistent-return
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!ref?.current) return;
      if (!ref.current.contains(e.target as Element)) {
        onClick?.(e as MouseEvent);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
}

export default useOutsideClick;
