import React from 'react';

import cn from 'clsx';

import { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, outline, disabled, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          'py-2 px-4 font-extrabold transition-colors leading-none bg-blue text-white rounded-md hover:bg-blue-80',
          outline && 'bg-transparent shadow-border hover:bg-transparent',
          disabled && 'bg-blue-60 cursor-not-allowed',
          className
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
