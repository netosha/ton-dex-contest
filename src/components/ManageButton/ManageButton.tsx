import React from 'react';

import Link from 'next/link';

import { useDispatch, useSelector } from '@src/hooks';
import { Button } from '@src/ui';
import { getWalletPools, selectWalletPools } from '@store/pool';

import { ManageButtonProps } from './ManageButton.types';

const ManageButton: React.VFC<ManageButtonProps> = (props) => {
  const dispatch = useDispatch();
  const { pool, address, status } = props;
  const { walletPools, isWalletPoolsLoading } = useSelector(selectWalletPools);

  React.useEffect(() => {
    // Todo: replace better nicer update rule
    if (
      status === 'connected' &&
      address &&
      !Object.entries(walletPools).length
    ) {
      dispatch(getWalletPools({}));
    }
  }, [status, address]);

  if (!pool || status === 'connecting' || isWalletPoolsLoading) {
    return <div className="h-8 w-20 rounded-md animate-shine " />;
  }

  if (status === 'disconnected' || !address) {
    return null;
  }

  if (walletPools[pool.id]) {
    return (
      <Link href={`/pool/${pool.id}/manage`}>
        <Button>Manage liquidity</Button>
      </Link>
    );
  }

  return (
    <Link href={`/pool/create`}>
      <Button>Provide liquidity</Button>
    </Link>
  );
};

export default ManageButton;
