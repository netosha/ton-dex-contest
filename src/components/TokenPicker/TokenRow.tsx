import React from 'react';

import cn from 'clsx';

import Loader from '@components/Loader';
import { TokenRowProps } from '@components/TokenPicker/TokenPicker.types';
import { useDispatch, useSelector } from '@src/hooks';
import {
  getTokenBalance,
  selectTokenBalances,
  selectWallet,
} from '@store/wallet';

const TokenRow: React.VFC<TokenRowProps> = ({ token, onClick, isActive }) => {
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
          {typeof balance === 'number' ? balance.toFixed(2) : <Loader />}
        </span>
      )}
    </button>
  );
};

export default TokenRow;
