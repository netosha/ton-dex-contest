import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container min-h-screen flex flex-col gap-2 pt-2 mx-auto px-4">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
