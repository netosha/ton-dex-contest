import React from 'react';

import type { NextPage } from 'next';

import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';
import { selectWallet, connectWallet } from '@store/wallet';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const wallet = useSelector(selectWallet);
  const dispatch = useDispatch();

  const handleConnect = () => {
    dispatch(connectWallet('EQCP_Es4UsKIQdU2Hid4HVFA3f5YKls9tMzxQTJz9r7l3_nO'));
  };

  return (
    <div className={styles.container}>
      wall: {wallet.address}
      <br />
      status: {wallet.status}
      <br />
      <button disabled={wallet.status === 'connecting'} onClick={handleConnect}>
        connect wallet
      </button>
    </div>
  );
};

export default Home;
