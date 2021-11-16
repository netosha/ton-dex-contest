import React from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import cn from 'clsx';

const PriceChange: React.VFC<{
  type: 'rise' | 'fall';
  value: number;
}> = ({ type, value }) => {
  return (
    <div
      className={cn(
        'flex items-center leading-none gap-1',
        type === 'fall' ? 'text-red' : 'text-green'
      )}
    >
      {type === 'fall' ? (
        <ArrowDownIcon className="h-4 w-4" />
      ) : (
        <ArrowUpIcon className="h-4 w-4" />
      )}
      <span>{value}%</span>
    </div>
  );
};

export default PriceChange;
