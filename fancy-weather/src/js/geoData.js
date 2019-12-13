const config = require('./config');

const getGeoPosition = async () => {
  const requestUrl = `${config.ipBaseUrl}${config.ipInfoToken}`;

  const response = await fetch(requestUrl);
  const geoPositionIP = await response.json();

  return geoPositionIP;
};

const getGeoPositionData = async (latitude, longitude, language) => {
  const queryParams = `q=${latitude}%2C%20${longitude}&key=${config.openCageDataApiKey}&language=${language}&pretty=1`;
  const requestUrl = `${config.openCageDataBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const geoPositionDataOpenCageData = await response.json();

  return geoPositionDataOpenCageData;
};

const searchByValueData = async (searchValue, language) => {
  // https://api.opencagedata.com/geocode/v1/json?q=55.04919%2C%2082.90760&key=6eb7573ac0774c80b86076570603f8bd&language=be&pretty=1
  // https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1
  // https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=6eb7573ac0774c80b86076570603f8bd&language=en&pretty=1
  const queryParams = `q=${searchValue}&key=${config.openCageDataApiKey}&language=${language}&pretty=1`;
  const requestUrl = `${config.openCageDataBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const geoPositionDataOpenCageData = await response.json();

  return geoPositionDataOpenCageData;
};

module.exports = {
  getGeoPosition,
  getGeoPositionData,
  searchByValueData,
};
