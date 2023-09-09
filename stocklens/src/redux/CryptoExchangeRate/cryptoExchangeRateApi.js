const getExchangeRate = async (assetId) => {
  try {
    const res = await fetch(
      `https://api.coinstats.app/public/v1/charts?period=1m&coinId=${assetId}`,
      {
        headers: {
          'X-CoinAPI-Key': '28CEFAE9-EC4C-4649-8764-78A6C73BDE1C',
        },
      },
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export default getExchangeRate;
