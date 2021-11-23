import { HTMLAttributes, ReactNode } from 'react';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Position where tooltip would shown
   *
   * Default: bottom
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   *  Force set tooltip visible
   */
  isOpen?: boolean;

  /**
   * Prevent from showing, even if it hovered
   */
  disabled?: boolean;

  content: ReactNode;
}
