import React from 'react';

import { NextPage } from 'next';

import Chart from '@components/Chart';
import fakeData from '@components/Chart/fakeData';

const Playground: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Chart data={fakeData} />
    </div>
  );
};

export default Playground;