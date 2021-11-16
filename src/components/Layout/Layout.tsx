import React from 'react';

import Header from '@components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container flex flex-col gap-2 pt-2 mx-auto px-4">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
