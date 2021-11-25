import React from 'react';

import Loader from '@components/Loader';
import { useDispatch, useSelector } from '@src/hooks';
import { getTokenBalance, selectWallet } from '@store/wallet';

export type BalanceRowProps = {
  address: string;
  onBalanceClick?: (balance: number) => void;
};

const BalanceRow: React.VFC<BalanceRowProps> = (props) => {
  const { address, onBalanceClick } = props;
  const dispatch = useDispatch();

  const {
    balances,
    address: walletAddress,
    status,
  } = useSelector(selectWallet);

  React.useEffect(() => {
    if (
      walletAddress &&
      status === 'connected' &&
      balances[address] === undefined
    ) {
      dispatch(getTokenBalance(address));
    }
  }, [address, walletAddress]);

  // Show nothing if token addres are not provided or wallet not connected
  if (!walletAddress || status !== 'connected' || !address) {
    return null;
  }

  const availableBalance = balances[address];

  return (
    <div className="w-full flex">
      <div className="flex items-center mb-2 text-sm font-semibold text-violet-60">
        Available:
        {availableBalance === null && <Loader className="ml-1" />}
        {typeof availableBalance === 'number' && (
          <span
            className="ml-1 font-bold cursor-pointer"
            onClick={() => onBalanceClick?.(availableBalance)}
          >
            {availableBalance}
          </span>
        )}
      </div>
    </div>
  );
};

export default BalanceRow;
