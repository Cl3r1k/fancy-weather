const config = require('./config');

const getWeatherDataByPosition = async (latitude, longitude) => {
  // const reserveKey = '2bf27985f5a6844febcdc43c99cc81ce';
  const requestUrl = `${config.proxyURL}${config.darkSkyBaseUrl}${config.darkSkySecretKey}/${latitude},${longitude}`;

  const response = await fetch(requestUrl);
  const weatherData = await response.json();

  return weatherData;
};

module.exports = {
  getWeatherDataByPosition,
};
