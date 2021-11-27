import React from 'react';

import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { AddLiquidityProps } from '@components/LiquidityManager/LiquidityManager.types';
import TokenPicker from '@components/TokenPicker';
import {
  PickedTokens,
  TokenPickerStatus,
} from '@components/TokenPicker/TokenPicker.types';
import { useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import { selectWallet } from '@store/wallet';

const AddLiquidity: React.VFC<AddLiquidityProps> = ({ pool, onAdd }) => {
  const { balances } = useSelector(selectWallet);
  const poolTokens = pool.locked;
  const [tokens, setTokens] = React.useState<PickedTokens>(
    poolTokens.map((t) => ({
      ...t,
      amount: null,
    })) as PickedTokens
  );

  const handleTokensChange = (t: PickedTokens) => {
    if (t.some((tok, i) => tok?.address !== poolTokens[i]!.address)) return;

    console.log(tokens, t);
    setTokens(t);
  };

  // Todo: Make it as separate function
  const formStatus = ((): TokenPickerStatus => {
    // If some amount are invalid
    if (!tokens.every((t) => typeof t?.amount === 'number')) {
      return {
        buttonText: 'Provide all amounts',
        disabled: true,
        inputErrors: {},
      };
    }

    // Check if some amount lower than balance
    if (
      tokens.some(
        (t) => balances[t!.address] === 0 || balances[t!.address]! < t!.amount!
      )
    ) {
      const inputErrors = tokens.reduce(
        (prev, t, i) =>
          balances[t!.address]! < t!.amount! ? { ...prev, [i]: true } : prev,
        {}
      );
      return {
        buttonText: 'Insufficient amount',
        disabled: true,
        inputErrors,
      };
    }

    return {
      buttonText: 'Supply',
      disabled: false,
      inputErrors: {},
    };
  })();

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center text-violet">
          <Link passHref={true} href={`/pool/${pool.id}/manage`}>
            <ArrowSmLeftIcon className="h-6 w-6 hover:text-blue transition-colors cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-black">Add liquidity</h1>
        </div>
        <TokenPicker
          button={
            <Button
              disabled={formStatus.disabled}
              onClick={onAdd}
              className="mt-2"
            >
              {formStatus.buttonText}
            </Button>
          }
          tokens={tokens}
          inputErrors={formStatus.inputErrors}
          onChange={handleTokensChange}
          type={'stake'}
        />
      </div>
    </div>
  );
};

export default AddLiquidity;
