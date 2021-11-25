import React from 'react';

import cn from 'clsx';

import { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, outline, disabled, round, error, ...rest } =
      props;
    return (
      <button
        ref={ref}
        className={cn(
          'py-2 px-4 font-extrabold transition-colors leading-none bg-blue text-white rounded-md hover:bg-darkblue',
          outline &&
            'bg-transparent transition-shadow !text-blue shadow-border-blue hover:bg-transparent hover:shadow-border-darkblue hover:!text-darkblue',
          disabled && 'bg-gray hover:bg-gray cursor-not-allowed',
          round && 'rounded-full',
          error && `transition-shadow !shadow-border-red`,
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
