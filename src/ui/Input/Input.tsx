import React from 'react';

import cn from 'clsx';

import { InputProps } from './Input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      placeholder={'lox'}
      className={cn(
        className,
        'py-1 px-4 leading-normal bg-control rounded-lg outline-none'
      )}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
