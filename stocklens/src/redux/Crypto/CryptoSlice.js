import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchDataFromApi from './CryptoApi';

const metadataUrl = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=1000&currency=USD';

const cryptoHistory = 'https://api.coinstats.app/public/v1/markets?coinId=';

const initialState = {
  crypto: [],
  cryptoHistory: [],
};

export const getCryptoMeta = createAsyncThunk(
  'crypto/getCryptoMeta',
  async () => {
    const metadata = await fetchDataFromApi(metadataUrl);
    return metadata;
  },
);

export const getCryptoHistory = createAsyncThunk(
  'crypto/getCryptoHistory',
  async (assetId) => {
    const history = await fetchDataFromApi(cryptoHistory + assetId);
    return history;
  },
);

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoMeta.fulfilled, (state, action) => {
        state.crypto = action.payload;
      })
      .addCase(getCryptoHistory.fulfilled, (state, action) => {
        state.cryptoHistory = action.payload;
      });
  },
});

export const selectCryptoData = (state) => state.crypto.crypto;
export const selectCryptoHistory = (state) => state.crypto.cryptoHistory;

export default cryptoSlice.reducer;
