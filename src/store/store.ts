import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { walletReducer } from './wallet/walletReducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  wallet: walletReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
