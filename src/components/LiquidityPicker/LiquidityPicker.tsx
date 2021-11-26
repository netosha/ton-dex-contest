import React from 'react';

import { Button } from '@src/ui';

const TokenCard: React.VFC<{ symbol: string; amount: string }> = ({
  symbol,
  amount,
}) => {
  return (
    <div className=" flex flex-col p-4 rounded-md bg-blue hover:bg-darkblue transition-colors text-white">
      <span className="font-extrabold text-2xl">{symbol}</span>
      <span className="font-bold mt-auto">{amount}</span>
    </div>
  );
};

const LiquidityPicker = () => {
  // const [tab, setTab] = React.useState<'add' | 'remove' | 'view'>('view');

  return (
    <div className="flex flex-col gap-3 max-w-[25rem] w-full">
      <h1 className="text-2xl font-black text-violet">Manage liquidity</h1>

      <div className="grid grid-rows-2 gap-4 w-full ">
        <TokenCard symbol={'WBTC'} amount={'0.123'} />
        <TokenCard symbol={'WBTC'} amount={'0.123'} />
      </div>
      <div className="flex flex-col mt-2 gap-2">
        <span className="text-violet text-violet-60">
          Your pool share: <b className="text-violet">~0.2%</b>
        </span>
        <span className="text-violet text-violet-60">
          Income: <b className="text-violet">0.5 WBTC</b>,{' '}
          <b className="text-violet">0.0001 WBTC</b>
        </span>
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <Button className="w-full" danger>
          Remove
        </Button>
        <Button className="w-full">Add</Button>
      </div>
    </div>
  );
};

export default LiquidityPicker;
