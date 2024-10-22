const generateMockData = (city) => {
    const mockData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i); 
      const currentTemp = (Math.random() * 20 + 20).toFixed(1);
      mockData.push({
        city: city,
        dateFetched: date.toISOString(),
        currentTemp: parseFloat(currentTemp),
      });
    }
    return mockData;
  };
  
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad', 'Kolkata'];
  
  const historicalDataForCities = cities.reduce((data, city) => {
    data[city] = generateMockData(city);
    return data;
  }, {});
  
  export default historicalDataForCities;
  