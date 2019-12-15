const config = require('./settings/config');

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
  const queryParams = `q=${searchValue}&key=${config.openCageDataApiKey}&language=${language}&pretty=1`;
  const requestUrl = `${config.openCageDataBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const geoPositionDataOpenCageData = await response.json();

  return geoPositionDataOpenCageData;
};

const getCurrentPosition = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default {
  getGeoPosition,
  getGeoPositionData,
  searchByValueData,
  getCurrentPosition,
};
