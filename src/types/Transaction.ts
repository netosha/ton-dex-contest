export interface Transaction {
  /**
   * Transaction hash
   *
   * WARNING! Do not confuse with Tx Id. It's a different things!
   */
  hash: string;

  /**
   * Sender transaction
   *
   * TODO: Replace with transaction type
   */
  from: string;

  /**
   * Recipient transaction
   *
   * TODO: Replace with transaction type
   */
  to: string;

  /**
   * Unix formatted
   */
  timestamp: number;

  /**
   * Contract's write method name that was executed
   */
  method: 'transfer' | 'swap';

  /**
   * Data, that sent with transaction.
   *
   * For example: method params or something like that.
   *
   * Note: Not a production variant
   */
  misc?: any;
}
