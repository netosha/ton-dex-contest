export interface WalletMethods {
  myAddress: () => Promise<string>;
  getBalance: () => Promise<number>;
}
