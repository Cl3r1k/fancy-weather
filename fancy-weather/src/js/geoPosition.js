const config = require('./config');

const getGeoPosition = async () => {
  const requestUrl = `${config.ipBaseUrl}${config.ipInfoToken}`;

  const response = await fetch(requestUrl);
  const geoPositionData = await response.json();

  return geoPositionData;
};

module.exports = {
  getGeoPosition,
};
