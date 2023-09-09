import fetchMock from 'fetch-mock';
import fetchDataFromApi from './redux/Crypto/CryptoApi';

it('fetches data from a URL successfully', async () => {
  const url = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=1000&currency=USD';
  const expectedData = {};

  fetchMock.get(url, expectedData);

  const result = await fetchDataFromApi(url);

  expect(result).toEqual(expectedData);
});
