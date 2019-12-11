const config = require('./config');

const getWeatherDataByPosition = async (latitude, longitude) => {
  const requestUrl = `${config.proxyURL}${config.darkSkyBaseUrl}${config.darkSkySecretKey}/${latitude},${longitude}`;

  const response = await fetch(requestUrl);
  const weatherData = await response.json();

  return weatherData;
};

module.exports = {
  getWeatherDataByPosition,
};
