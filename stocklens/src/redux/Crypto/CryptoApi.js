const fetchDataFromApi = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok (status ${response.status})`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export default fetchDataFromApi;
