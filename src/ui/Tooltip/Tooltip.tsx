import React from 'react';

import cn from 'clsx';

import { TooltipProps } from './Tooltip.types';

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { position = 'bottom', className, isOpen, content } = props;

  // Force update
  const update = React.useReducer((x) => x + 1, 0)[1];
  const [visible, setVisible] = React.useState<boolean>(false);
  const lastOut = React.useRef<number | null>(null);
  const { children } = props;

  const onMouseEnter = () => {
    lastOut.current = null;
    setVisible(true);

    // Update opacity bounded to lastOut after setting visible
    setTimeout(update);
  };

  const onMouseLeave = () => {
    const anchor = Date.now();
    lastOut.current = anchor;
    setTimeout(update, 100);
    setTimeout(() => {
      if (lastOut.current === anchor) {
        setVisible(false);
        lastOut.current = null;
      }
    }, 250);
  };

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {(visible || isOpen) && (
        <div
          ref={ref}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={cn(
            className,
            'absolute transition-opacity transform',
            lastOut.current && !isOpen && 'opacity-0',
            position === 'bottom' && 'top-full+2 left-1/2  -translate-x-1/2',
            position === 'top' && 'bottom-full+2  left-1/2  -translate-x-1/2',
            position === 'left' && 'top-1/2 right-full+2 -translate-y-1/2',
            position === 'right' && 'top-1/2 left-full+2 -translate-y-1/2'
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
