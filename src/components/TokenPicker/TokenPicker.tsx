import React from 'react';

import {
  ArrowDownIcon,
  ChevronDownIcon,
  ClockIcon,
  CogIcon,
} from '@heroicons/react/solid';

import Loader from '@components/Loader';
import { useDispatch, useSelector } from '@src/hooks';
import { Token } from '@src/types';
import { Button, Input, Modal, Tooltip } from '@src/ui';
import parseFriendlyAddress from '@src/utils/parseFriendlyAddress';
import { addUnknownToken, selectTokens } from '@store/token';
import {
  getTokenBalance,
  selectTokenBalances,
  selectWallet,
} from '@store/wallet';

import {
  PickedTokens,
  TokenPickerProps,
  TokenRowProps,
} from './TokenPicker.types';

export const TokenRow: React.VFC<TokenRowProps> = ({ token, onClick }) => {
  const dispatch = useDispatch();
  const wallet = useSelector(selectWallet);
  const balances = useSelector(selectTokenBalances);

  const isWalletProvided = wallet.address && wallet.status === 'connected';
  const balance = balances[token.address];

  React.useEffect(() => {
    // Todo: replace with nicer update rule
    if (isWalletProvided && balance === undefined) {
      dispatch(getTokenBalance(token.address));
    }
  }, []);

  return (
    <button
      className="flex py-2 px-4 rounded-md bg-control font-bold transition-colors hover:bg-blue hover:text-white"
      onClick={onClick}
    >
      <span>{token.name}</span>
      {isWalletProvided && (
        <span className="ml-auto">
          {balance !== undefined ? balance.toFixed(2) : <Loader />}
        </span>
      )}
    </button>
  );
};

// Todo: Decompose it)
const TokenPicker: React.VFC<TokenPickerProps> = ({ onChange, tokens }) => {
  // Index of selecting token
  const [tokenModal, setTokenModal] = React.useState<null | number>(null);
  const [filter, setFilter] = React.useState<string>('');

  const isFilterValidAddress = !!parseFriendlyAddress(filter).hashPart;
  const dispatch = useDispatch();

  const knownTokens = Object.values(useSelector(selectTokens));
  const { balances, status, address } = useSelector(selectWallet);

  const filteredTokens = filter
    ? knownTokens.filter(
        (t) =>
          t.address.toLowerCase().includes(filter.toLowerCase()) ||
          t.name.toLowerCase().includes(filter.toLowerCase())
      )
    : knownTokens;

  const firstToken = tokens[0];
  const secondToken = tokens[1];

  const availableBalance: null | number | undefined = firstToken
    ? balances[firstToken?.address]
    : null;

  const isInsufficientBalance = !!(
    firstToken &&
    typeof availableBalance === 'number' &&
    firstToken.amount > availableBalance
  );

  const handleAmountChange = (index: number, amount: string) => {
    const newTokens = [...tokens] as PickedTokens;
    const changedItem = newTokens[index]!;
    const parsedAmount = Number(amount);

    // For testing purposes convertion rate are fixed
    // Every firstToken gives 1.51 secondTokens
    // For ex: 1BNB = 1.51ETH, 7BTC = 10,57DAI and etc.
    // Not a production-ready solution
    const otherIndex = index === 0 ? 1 : 0;
    const otherItem = newTokens[otherIndex]!;

    newTokens.splice(index, 1, { ...changedItem, amount: parsedAmount });
    newTokens.splice(otherIndex, 1, {
      ...otherItem,
      amount: parsedAmount * 1.51,
    });

    onChange?.(newTokens);
  };

  const handleTokenChange = (index: number, token: Token) => {
    const newTokens = [...tokens] as PickedTokens;
    const changedItem = newTokens[index]!;
    newTokens.splice(index, 1, {
      ...changedItem,
      ...token,
    });
    onChange?.(newTokens);
    setTokenModal(null);
  };

  const onAddToken = () => {
    dispatch(addUnknownToken(filter));
    setFilter('');
  };

  // Update available balance on account or first token change
  React.useEffect(() => {
    if (firstToken && address) {
      if (balances[firstToken.address] === undefined) {
        console.log(firstToken.symbol, 'balance updated');
        dispatch(getTokenBalance(firstToken.address));
      }
    }
  }, [address, firstToken?.address]);

  return (
    <>
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col">
          {status === 'connected' && firstToken && (
            <div className="w-full flex">
              <span className="mb-2 text-sm font-semibold text-violet-60">
                Available: <span className="font-bold">{availableBalance}</span>
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              className="font-bold"
              placeholder="0.0"
              pattern="[0-9]*"
              value={firstToken?.amount}
              error={isInsufficientBalance}
              onChange={(e) => handleAmountChange(0, e.target.value)}
            />
            <Button
              className="flex justify-center w-full font-bold gap-1 !text-violet !bg-control hover:!text-blue"
              onClick={() => setTokenModal(0)}
            >
              {firstToken?.address ? (
                <>
                  <span className="uppercase">{firstToken?.symbol}</span>
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
          <Input
            className="font-bold"
            value={secondToken?.amount}
            onChange={(e) => handleAmountChange(1, e.target.value)}
            placeholder="0.0"
          />
          <Button
            onClick={() => setTokenModal(1)}
            className="flex justify-center w-full font-bold gap-1 !text-violet !bg-control hover:!text-blue"
          >
            {secondToken?.address ? (
              <>
                <span className="uppercase">{secondToken?.symbol}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </>
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
        <Button
          disabled={isInsufficientBalance}
          className="mt-2"
          onClick={() => alert('l123')}
        >
          Swap
        </Button>
        <div className="w-full gap-4 flex justify-center text-blue">
          <Tooltip
            content={
              <div className="flex justify-center py-2 min-w-[11.5rem] px-4 bg-lightgray text-dark font-semibold rounded-md">
                This will be the settings
              </div>
            }
            position="bottom"
          >
            <CogIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
          </Tooltip>
          <Tooltip
            content={
              <div className="flex justify-center py-2 min-w-[11.5rem] px-4 bg-lightgray text-dark font-semibold rounded-md">
                This will be the recent transactions
              </div>
            }
            position="top"
          >
            <ClockIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
          </Tooltip>
        </div>
      </div>

      <Modal
        heading="Select token"
        isOpen={tokenModal !== null}
        onClose={() => setTokenModal(null)}
      >
        <Input
          className="!shadow-border-lightgray focus:!shadow-border-blue"
          outline
          value={filter}
          placeholder="Address"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="mt-4 flex flex-col gap-2">
          {filteredTokens.map((t) => (
            <TokenRow
              key={t.address}
              token={t}
              onClick={() => {
                handleTokenChange(tokenModal!, t);
              }}
            />
          ))}
          {filteredTokens.length === 0 &&
            (isFilterValidAddress ? (
              <>
                <Button onClick={onAddToken}>Add address</Button>
                <span className="mx-auto text-violet-60">
                  Be careful with importing unknown addresses
                </span>
              </>
            ) : (
              <span className="mx-auto text-violet-60">No tokens found</span>
            ))}
        </div>
      </Modal>
    </>
  );
};

export default TokenPicker;
