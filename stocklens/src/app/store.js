import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cryptoReducer from '../redux/Crypto/CryptoSlice';
import cryptoExchangeRatesReducer from '../redux/CryptoExchangeRate/cryptoExchangeRateSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    cryptoExchangeRate: cryptoExchangeRatesReducer,
  },
  middleware: [thunk],
});

export default store;
