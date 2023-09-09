import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getCryptoMeta,
  selectCryptoData,
} from './CryptoSlice';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('cryptoSlice', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch crypto metadata successfully', async () => {
    const store = mockStore({ crypto: { crypto: [], cryptoHistory: [] } });
    const mockMetadata = [];

    fetchMock.get(
      'https://api.coinstats.app/public/v1/coins?skip=0&limit=1000&currency=USD',
      mockMetadata,
    );

    await store.dispatch(getCryptoMeta()).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toEqual(getCryptoMeta.fulfilled.type);
      expect(selectCryptoData(store.getState())).toEqual(mockMetadata);
    });
  });
});
