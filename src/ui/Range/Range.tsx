import React from 'react';

import cn from 'clsx';

import styles from './Range.module.scss';
import { RangeProps } from './Range.types';

const Range = React.forwardRef<HTMLInputElement, RangeProps>((props, ref) => {
  const { value, style, min, onChange, max, className, ...rest } = props;

  const progress =
    Number(Number(value) - Number(min ?? 0)) /
    (Number(max ?? 100) - Number(min ?? 0));

  const styleWithProgress = {
    ...style,
    '--progress': `${progress * 100}%`,
  } as React.CSSProperties;

  return (
    <input
      ref={ref}
      onChange={(e) => {
        onChange?.(e);
      }}
      min={min}
      max={max}
      style={styleWithProgress}
      className={cn(styles.range, className)}
      value={value}
      {...rest}
      type="range"
    />
  );
});

Range.displayName = 'Range';

export default Range;
