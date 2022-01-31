import React from 'react';

import { InformationCircleIcon } from '@heroicons/react/solid';

import { TokenRowProps } from './Confirmation.types';

const TokenRow: React.FC<TokenRowProps> = ({ token }) => {
  return (
    <div
      key={token.address}
      className="flex items-center py-2 px-4 text-dark font-bold rounded-md bg-control"
    >
      {token.amount} {token.symbol}
      <a
        href="https://github.com/akifoq/TonToken"
        target="_blank"
        rel="noreferrer"
        className="ml-auto"
      >
        <InformationCircleIcon className="text-darkgray h-4 w-4" />
      </a>
    </div>
  );
};

export default TokenRow;
