import React from 'react';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-4 text-sm flex text-bold text-violet-20 justify-center w-full mt-auto gap-4">
      <Link href="https://github.com/netosha/ton-dex-contest">
        <a className="transition-colors hover:text-violet">GitHub</a>
      </Link>
      <Link href="https://github.com/netosha/ton-dex-contest/blob/main/LICENSE">
        <a className="transition-colors hover:text-violet">MIT</a>
      </Link>
    </footer>
  );
};

export default Footer;
