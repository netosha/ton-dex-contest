import React from 'react';

import {
  ArrowDownIcon,
  ChevronDownIcon,
  ClockIcon,
  CogIcon,
} from '@heroicons/react/solid';

import { Button, Input, Modal } from '@src/ui';

import { PickedTokens, TokenPickerProps } from './TokenPicker.types';

const sampleTokens = [
  'motherly',
  'presence',
  'separation',
  'language',
  'treasure',
  'connection',
  'pronunciation',
  'suspicious',
  'northern',
  'universal',
  'department',
  'heavenly',
  'marriage',
  'lengthen',
  'membership',

  'northern',
  'universal',
  'department',
  'heavenly',
  'marriage',
  'lengthen',
  'membership',
];

const TokenPicker: React.VFC<TokenPickerProps> = ({ onChange, tokens }) => {
  // Index of selecting token
  const [tokenModal, setTokenModal] = React.useState<null | number>(null);

  const firstToken = tokens[0];
  const secondToken = tokens[1];

  const handleAmountChange = (index: number, amount: string) => {
    const newTokens = [...tokens] as PickedTokens;
    const changedItem = newTokens[index]!;
    const parsedAmount = Number(amount);
    newTokens.splice(index, 1, { ...changedItem, amount: parsedAmount });
    onChange?.(newTokens);
  };

  const handleTokenChange = (index: number, address: string) => {
    const newTokens = [...tokens] as PickedTokens;
    const changedItem = newTokens[index]!;
    newTokens.splice(index, 1, {
      ...changedItem,
      address,
      ticker: address.slice(0, 3),
    });
    onChange?.(newTokens);
    setTokenModal(null);
  };

  return (
    <>
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col">
          <div className="w-full flex">
            <span className="mb-2 text-sm font-semibold text-violet-60">
              Available: <span className="font-bold">А хер пока его знает</span>
            </span>
          </div>
          <div className="flex gap-2">
            <Input
              className="font-bold"
              placeholder="0.0"
              onChange={(e) => handleAmountChange(0, e.target.value)}
            />
            <Button
              className="flex font-bold gap-1 !text-violet !bg-control hover:!text-blue"
              onClick={() => setTokenModal(0)}
            >
              {firstToken?.address ? (
                <>
                  <span className="uppercase">{firstToken?.ticker}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </>
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ArrowDownIcon className="h-6 w-6 text-blue" />
        </div>
        <div className="flex gap-2 group">
          <Input className="font-bold" placeholder="0.0" />
          <Button
            onClick={() => setTokenModal(1)}
            className="w-full justify-center flex font-bold gap-1 !text-violet !bg-control hover:!text-blue"
          >
            {secondToken?.address ? (
              <>
                <span className="uppercase">{secondToken?.ticker}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </>
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
        <Button className="mt-2">Swap</Button>
        <div className="w-full gap-4 flex justify-center text-blue">
          <CogIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
          <ClockIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
        </div>
      </div>
      <Modal
        heading="Select token"
        isOpen={tokenModal !== null}
        onClose={() => setTokenModal(null)}
      >
        <Input className="rounded-full" placeholder="Filter" />
        <div className="mt-4 flex flex-col gap-2">
          {sampleTokens.map((t) => (
            <button
              className="flex py-2 px-4 rounded-md bg-control font-bold transition-colors hover:bg-blue hover:text-white"
              key={t}
              onClick={() => handleTokenChange(tokenModal!, t.toUpperCase())}
            >
              {t}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default TokenPicker;
