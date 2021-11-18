import React from 'react';

import Loader from '@components/Loader';
import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';
import { Button } from '@src/ui';
import { connectWallet, resetWallet, selectWallet } from '@store/wallet';

const Wallet: React.VFC = () => {
  const wallet = useSelector(selectWallet);
  const dispatch = useDispatch();

  const { status } = wallet;

  const handleConnect = () => {
    dispatch(connectWallet());
  };

  const handleReset = () => {
    dispatch(resetWallet());
  };

  if (status === 'connected')
    return (
      <Button
        onClick={handleReset}
        outline
        className="w-[9rem] h-[2rem] whitespace-nowrap "
      >
        {`${wallet.address?.slice(0, 4)} ... ${wallet.address?.slice(-4)}`}
      </Button>
    );

  if (status === 'connecting') {
    return (
      <Button
        disabled
        className="w-[9rem] h-[2rem] !bg-darkblue flex justify-center items-center"
      >
        <Loader />
      </Button>
    );
  }

  return (
    <Button
      className="w-[9rem]  h-[2rem] flex justify-center whitespace-nowrap"
      onClick={handleConnect}
    >
      Connect wallet
    </Button>
  );
};

export default Wallet;
