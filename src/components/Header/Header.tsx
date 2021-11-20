import React from 'react';

import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Wallet from '@components/Wallet/Wallet';
import logo from 'assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-2 w-full text-primary">
      <Image
        className="transition-all hover:rotate-[120deg] tr"
        src={logo}
        alt="logo"
      />
      <div
        className={cn(
          'flex flex-1 mx-4 font-extrabold text-violet',
          'gap-2 md:gap-8',
          'md:ml-16'
        )}
      >
        <Link href="/swap">
          <a className="transition-colors hover:text-blue">Swap</a>
        </Link>
        <Link href="/pools">
          <a className="transition-colors hover:text-blue">Pools</a>
        </Link>
        <Link href="/tokens">
          <a className="transition-colors hover:text-blue">Tokens</a>
        </Link>
      </div>
      <div className="ml-auto">
        <Wallet />
      </div>
    </header>
  );
};

export default Header;
