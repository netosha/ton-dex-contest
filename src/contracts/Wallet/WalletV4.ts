import { sleep } from '@src/utils';

import { WalletMethods } from './Wallet.types';

export class WalletV4 implements WalletMethods {
  protected walletPrivateKey: Buffer;

  protected walletPublicKey: Buffer;

  constructor(pubKey: Buffer, privateKey: Buffer) {
    this.walletPublicKey = pubKey;
    this.walletPrivateKey = privateKey;
  }

  async myAddress() {
    // 💫 Here should be magic interaction with blockchain instead
    await sleep(Math.random() * 1000);

    return 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N';
  }

  async getBalance() {
    await sleep(Math.random() * 1000);

    return Math.random() * 10000;
  }
}
