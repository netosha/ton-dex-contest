import React from 'react';

import {
  ArrowDownIcon,
  ChevronDownIcon,
  ClockIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';
import cn from 'clsx';

import Loader from '@components/Loader';
import Transactions from '@components/Transactions';
import { useDispatch, useSelector } from '@src/hooks';
import { Token } from '@src/types';
import { Button, Input, Modal, Tooltip } from '@src/ui';
import parseFriendlyAddress from '@src/utils/parseFriendlyAddress';
import { addNewToken, selectTokens } from '@store/token';
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

export const TokenRow: React.VFC<TokenRowProps> = ({
  token,
  onClick,
  isActive,
}) => {
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
      className={cn(
        'flex items-center py-2 px-4 rounded-md bg-control font-bold transition-colors hover:bg-blue hover:text-white',
        isActive && '!bg-gray text-white cursor-not-allowed'
      )}
      disabled={isActive}
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
const TokenPicker: React.VFC<TokenPickerProps> = ({
  onChange,
  tokens,
  details,
}) => {
  // Index of selecting token
  const [tokenModal, setTokenModal] = React.useState<null | number>(null);
  const [amounts, setAmounts] = React.useState<string[]>(
    tokens.map((t) => t?.amount?.toString() ?? '')
  );

  // Can be replaced with global hook, if transaction modal will be cross-page component
  const [transactionsModal, setTransactionsModal] =
    React.useState<boolean>(false);

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

  const sourceToken = tokens[0];
  const otherTokens = tokens.slice(1);

  const availableBalance: null | number | undefined = sourceToken
    ? balances[sourceToken?.address]
    : null;

  const isInsufficientBalance = !!(
    sourceToken &&
    typeof availableBalance === 'number' &&
    !Number.isNaN(availableBalance) &&
    sourceToken.amount &&
    sourceToken.amount > availableBalance
  );

  const handleAmountChange = (index: number, amount: string) => {
    const regEx = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    if (amount && !regEx.test(amount)) return;

    setAmounts((v) => {
      const x = [...v];
      x.splice(index, 1, amount);
      return x;
    });

    // Handle case, if user want's to type decimal
    const lastChar = amount.slice(-1);
    const floatDecimal = amount.split('.')[1]?.slice(-1);
    if (lastChar === '.' || floatDecimal === '0') return;

    const newTokens = [...tokens] as PickedTokens;
    const changedItem = newTokens[index]!;

    const parsedAmount = amount ? Number(amount) : null;

    newTokens.splice(index, 1, {
      ...changedItem,
      amount: parsedAmount,
    });
    onChange?.(newTokens);
  };

  const handleTokenChange = (index: number, token: Token) => {
    // Reset amount, because user can submit it with old convert rate
    const newTokens = tokens.map((t) => ({
      ...t,
      amount: null,
    })) as PickedTokens;
    const changedItem = newTokens[index]!;

    newTokens.splice(index, 1, {
      ...changedItem,
      ...token,
    });

    onChange?.(newTokens);
    setTokenModal(null);
  };

  const onAddToken = () => {
    dispatch(addNewToken(filter));
    setFilter('');
  };

  const { error, message } = (() => {
    if (status !== 'connected' || !address) {
      return { error: true, message: `Provide wallet` };
    }
    if (tokens.some((t) => !t?.address)) {
      return { error: true, message: 'Select a token' };
    }
    if (
      tokens.some(
        (t) => tokens.filter((_) => _?.address === t?.address).length > 1
      )
    ) {
      return { error: true, message: 'Duplicated tokens' };
    }
    if (isInsufficientBalance) {
      return { error: true, message: 'Insufficient amount' };
    }

    return { error: false, message: 'Swap' };
  })();

  // Update available balance on account or first token change
  React.useEffect(() => {
    if (sourceToken && address) {
      if (balances[sourceToken.address] === undefined) {
        console.log(sourceToken.symbol, 'balance updated');
        dispatch(getTokenBalance(sourceToken.address));
      }
    }
  }, [address, sourceToken?.address]);

  React.useEffect(() => {
    setAmounts(() =>
      tokens.map((t) => (t?.amount === null ? '' : t?.amount?.toString() ?? ''))
    );
  }, [tokens]);

  return (
    <>
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col">
          {status === 'connected' && sourceToken && (
            <div className="w-full flex">
              <span className="flex mb-2 text-sm font-semibold text-violet-60">
                Available:
                {typeof availableBalance === 'number' && (
                  <span
                    className="ml-1 font-bold cursor-pointer"
                    onClick={() =>
                      handleAmountChange(0, availableBalance.toString())
                    }
                  >
                    {availableBalance}
                  </span>
                )}
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              className="font-bold"
              placeholder="0.0"
              value={amounts[0]}
              error={isInsufficientBalance}
              onChange={(e) => handleAmountChange(0, e.target.value)}
            />
            <Button
              className="flex justify-center w-full font-bold gap-1 !text-violet !bg-control hover:!text-blue"
              onClick={() => setTokenModal(0)}
            >
              {sourceToken?.address ? (
                <>
                  <span className="uppercase">{sourceToken?.symbol}</span>
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

        {otherTokens.map((t, index) => (
          <div className="flex gap-2 group" key={t?.address ?? index}>
            <Input
              className="font-bold"
              value={amounts[index + 1]}
              onChange={(e) => handleAmountChange(index + 1, e.target.value)}
              placeholder="0.0"
            />
            <Button
              onClick={() => setTokenModal(1)}
              className="flex justify-center w-full font-bold gap-1 !text-violet !bg-control hover:!text-blue"
            >
              {t?.address ? (
                <>
                  <span className="uppercase">{t?.symbol}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </>
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        ))}
        <Button disabled={error} className="mt-2">
          {message}
        </Button>
        <div className={cn('w-full gap-4 flex justify-center text-blue')}>
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

          <button onClick={() => setTransactionsModal(true)}>
            <ClockIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
          </button>

          {details && (
            <Tooltip
              disabled={tokens.some((t) => !t)}
              content={details}
              position="bottom"
            >
              <InformationCircleIcon className="h-6 w-6 transition-colors hover:text-darkblue" />
            </Tooltip>
          )}
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
              isActive={tokens[tokenModal!]?.address === t.address}
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

      <Modal
        isOpen={transactionsModal}
        onClose={() => setTransactionsModal(false)}
        heading="Recent transactions"
      >
        <Transactions address={address} />
      </Modal>
    </>
  );
};

export default TokenPicker;
