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
    dispatch(connectWallet('EQCP_Es4UsKIQdU2Hid4HVFA3f5YKls9tMzxQTJz9r7l3_nO'));
  };

  const handleReset = () => {
    dispatch(resetWallet());
  };

  if (status === 'connected')
    return (
      <Button onClick={handleReset} outline className="!text-blue">
        {`${wallet.address?.slice(0, 4)} ... ${wallet.address?.slice(-4)}`}
      </Button>
    );

  if (status === 'connecting') {
    return (
      <Button
        disabled
        className="!min-w-[9rem] !h-[2rem] !flex !justify-center !items-center"
      >
        <Loader />
      </Button>
    );
  }

  return <Button onClick={handleConnect}>Connect wallet</Button>;
};

export default Wallet;
