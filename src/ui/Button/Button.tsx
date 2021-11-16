import React from 'react';

import cn from 'clsx';

import { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          'py-1 px-4 leading-normal bg-blue text-white rounded-lg',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
