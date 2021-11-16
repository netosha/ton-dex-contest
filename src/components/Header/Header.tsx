import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';
import { connectWallet, selectWallet } from '@store/wallet';
import logo from 'assets/logo.svg';

export const Header: React.FC = () => {
  const wallet = useSelector(selectWallet);
  const dispatch = useDispatch();

  const handleConnect = () => {
    dispatch(connectWallet('EQCP_Es4UsKIQdU2Hid4HVFA3f5YKls9tMzxQTJz9r7l3_nO'));
  };

  return (
    <header className="flex justify-between items-center text-primary mt-3 mb-6">
      <Image src={logo} alt="logo" />
      <div className="flex-1 ml-16 font-extrabold">
        <Link href="/">
          <a className="mr-8">Swap</a>
        </Link>
        <Link href="/">
          <a className="mr-8">Pools</a>
        </Link>
        <Link href="/">
          <a>About</a>
        </Link>
      </div>
      {wallet.status === 'connected' ? (
        <button className="border-primary border-2 rounded px-4 py-2 font-extrabold">
          {`${wallet.address?.slice(0, 4)} ... ${wallet.address?.slice(-4)}`}
        </button>
      ) : (
        <button
          disabled={wallet.status === 'connecting'}
          onClick={handleConnect}
          className="bg-primary text-white rounded px-4 py-2 font-extrabold"
        >
          Connect wallet
        </button>
      )}
    </header>
  );
};
