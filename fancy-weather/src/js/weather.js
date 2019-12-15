const config = require('./config');

const getWeatherDataByPosition = async (latitude, longitude, language = 'en') => {
  const queryParams = `${config.darkSkySecretKey}/${latitude},${longitude}?lang=${language}`;
  const requestUrl = `${config.proxyURL}${config.darkSkyBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const weatherData = await response.json();

  return weatherData;
};

export default {
  getWeatherDataByPosition,
};
