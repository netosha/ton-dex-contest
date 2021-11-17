import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { poolReducer } from './pool/poolReducer';
import { tokenReducer } from './token/tokenReducer';
import { walletReducer } from './wallet/walletReducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  wallet: walletReducer,
  token: tokenReducer,
  pool: poolReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
