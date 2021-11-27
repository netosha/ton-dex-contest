import { sleep } from '@src/utils';

export interface TONRC20Methods {
  name: () => Promise<string>;
  balanceOf: (address: string) => Promise<number>;
  symbol: () => Promise<string>;
}

/**
 * Mockup of ERC20-like contract
 */
export class TONRC20 implements TONRC20Methods {
  private readonly contractAddress: string;

  protected readonly provider: any;

  get address(): string {
    return this.contractAddress;
  }

  constructor(address: string, provider: any) {
    this.contractAddress = address;
    this.provider = provider;
  }

  async balanceOf(address: string) {
    // 💫 Here should be magic interaction with blockchain instead
    await sleep(Math.random() * 1000);
    const fetchedBalance = Math.random() > 0.1 ? Math.random() * 1000 : 0;

    console.log(`[${this.contractAddress}] ${address}: ${fetchedBalance}`);

    return fetchedBalance;
  }

  async name() {
    // 💫 Here should be magic interaction with blockchain instead
    await sleep(Math.random() * 100);
    const name = Math.random().toString(16).slice(0, 10);
    console.log(`[${this.contractAddress}] Name: ${name}`);

    return name;
  }

  async symbol() {
    // 💫 Here should be magic interaction with blockchain instead
    await sleep(Math.random() * 100);
    const sym = Math.random().toString(16).slice(0, 3);
    console.log(`[${this.contractAddress}] Symbol: ${sym}`);

    return sym;
  }
}
