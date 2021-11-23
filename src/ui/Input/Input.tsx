import React from 'react';

import cn from 'clsx';

import { InputProps } from './Input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, error, round, outline, ...rest } = props;
  return (
    <input
      ref={ref}
      className={cn(
        className,
        'py-1 px-4 leading-normal bg-control rounded-md outline-none',
        outline &&
          'bg-transparent transition-shadow shadow-border-blue hover:bg-transparent focus:shadow-border-blue hover:shadow-border-blue',
        error && `transition-shadow shadow-border-red`,
        round && 'rounded-full'
      )}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
