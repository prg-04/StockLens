import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';
import fetchDataFromApi from './CryptoApi';

describe('fetchDataFromApi', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches data from a URL successfully', async () => {
    const url = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=2&currency=USD';
    const expectedData = {
      coins: [
        {
          id: 'bitcoin',
          icon: 'https://api.coin-stats.com/api/files/812fde17aea65fbb9f1fd8a478547bde/f3738cc5df5f59afb57111d67d951170_1.png',
          name: 'Bitcoin',
          symbol: 'BTC',
          rank: 1,
          price: 6362.74960614,
          priceBtc: 1,
          volume: 4514555849.85,
          marketCap: 110545616313,
          availableSupply: 17373875,
          totalSupply: 17373875,
          priceChange1h: 0.12,
          priceChange1d: -0.56,
          priceChange1w: -1.07,
          websiteUrl: 'https://bitcoin.org',
          redditUrl: 'https://www.reddit.com/r/bitcoin',
          twitterUrl: 'https://twitter.com/btc',
          exp: [
            'https://blockchain.info/',
            'https://live.blockcypher.com/btc/',
            'https://blockchair.com/bitcoin/blocks',
          ],
        },
        {
          id: 'ethereum',
          icon: 'https://api.coin-stats.com/api/files/812fde17aea65fbb9f1fd8a478547bde/e1259737fa19af705f0207d5b384c37e_1027.png',
          name: 'Ethereum',
          symbol: 'ETH',
          rank: 2,
          price: 208.130215868,
          priceBtc: 0.03282527,
          volume: 1522373585.13,
          marketCap: 21473551841,
          availableSupply: 103173639,
          totalSupply: 103173639,
          priceChange1h: 0.04,
          priceChange1d: -1.44,
          priceChange1w: -1.89,
          websiteUrl: 'https://www.ethereum.org/',
          redditUrl: 'https://www.reddit.com/r/ethereum',
          twitterUrl: 'https://twitter.com/ethereum',
          exp: [
            'https://etherscan.io/',
            'https://ethplorer.io/',
            'https://etherchain.org/',
          ],
        },
      ],
    };

    fetchMock.get(url, expectedData);

    const result = await fetchDataFromApi(url);

    expect(result).toEqual(expectedData);
  });

  it('handles a network error', async () => {
    const url = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=2&currency=USD';

    fetchMock.get(url, 500);

    await act(async () => {
      const result = await fetchDataFromApi(url);

      expect(result).toBeNull();
    });
  });
});
