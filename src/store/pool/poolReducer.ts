export type Pool = {
  id: string;
  fee: number;
  /**
   * Array of 2 addresses of tokens
   *
   * Note: it's simplified model of pair. It could significantly change in future
   */
  pair: [string, string];
};

export type PoolState = {
  userPools: Pool[];
};

export const initialState: PoolState = {
  userPools: [],
};

// export const Reducer = createReducer(initialState, (builder) =>
//   builder.addCase()
// );
