import getExchangeRate from './cryptoExchangeRateApi';

global.fetch = require('node-fetch');

describe('getExchangeRate', () => {
  it('fetches exchange rate data successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        someKey: 'someValue',
      }),
    };

    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const assetId = 'bitcoin';
    const exchangeRateData = await getExchangeRate(assetId);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.coinstats.app/public/v1/charts?period=1m&coinId=${assetId}`,
      expect.objectContaining({
        headers: {
          'X-CoinAPI-Key': '28CEFAE9-EC4C-4649-8764-78A6C73BDE1C',
        },
      }),
    );

    expect(exchangeRateData).toEqual({
      someKey: 'someValue',
    });
  });

  it('handles a network error', async () => {
    const mockResponse = {
      ok: false,
    };

    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const assetId = 'bitcoin';
    const exchangeRateData = await getExchangeRate(assetId);

    expect(exchangeRateData).toBeNull();
  });

  it('handles an error thrown by fetch', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch error'));

    const assetId = 'bitcoin';
    const exchangeRateData = await getExchangeRate(assetId);

    expect(exchangeRateData).toBeNull();
  });
});
