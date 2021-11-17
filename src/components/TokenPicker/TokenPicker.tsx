import React from 'react';

import {
  ArrowDownIcon,
  ChevronDownIcon,
  ClockIcon,
  CogIcon,
  MinusIcon,
} from '@heroicons/react/solid';

import { useSelector } from '@src/hooks';
import { Button, Input } from '@src/ui';
import { selectWallet } from '@store/wallet';

const TokenPicker: React.VFC = () => {
  const wallet = useSelector(selectWallet);
  const { status, balance } = wallet;

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-col">
        <div className="w-full flex">
          {status === 'connected' && (
            <span className="mb-2 text-sm font-semibold text-violet-60">
              Available: <span className="font-bold">{balance}</span>
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Input className="font-bold" placeholder="0.0" />
          <Button className="flex font-bold gap-1 !text-violet !bg-control hover:!text-blue">
            TON <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <ArrowDownIcon className="h-6 w-6 text-blue" />
      </div>
      <div className="flex gap-2 group">
        <Input className="font-bold" placeholder="0.0" />
        <Button className="w-full justify-center flex font-bold gap-1 !text-violet !bg-control hover:!text-blue">
          <MinusIcon className="h-4 w-4" />

          {/* <ChevronDownIcon className="w-4 h-4" /> */}
        </Button>
      </div>
      <Button className="mt-2">Swap</Button>
      <div className="w-full gap-4 flex justify-center text-blue">
        <CogIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
        <ClockIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
      </div>
    </div>
  );
};

export default TokenPicker;
