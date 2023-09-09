import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getExchangeRate from './cryptoExchangeRateApi';

const initialState = {
  exchangeRate: [],
};

export const getRates = createAsyncThunk(
  'cryptoExchangeRate/getRates',
  async (assetId) => {
    const data = await getExchangeRate(assetId);
    return data;
  },
);

const cryptoExchangeRateSlice = createSlice({
  name: 'cryptoExchangeRate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRates.fulfilled, (state, action) => {
      state.exchangeRate = action.payload;
    });
  },
});

export const selectExchangeRate = (state) => state.cryptoExchangeRate.exchangeRate;
export default cryptoExchangeRateSlice.reducer;
