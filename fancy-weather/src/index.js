/* eslint-disable no-console */
import './scss/main.scss';

const geoPosition = require('./js/geoPosition');
const weather = require('./js/weather');
const image = require('./js/image');
const map = require('./js/map');

const initApp = async () => {
  // Get Position Data
  const geoPositionData = await geoPosition.getGeoPosition();
  const cityName = geoPositionData.city;
  const countryName = geoPositionData.country;
  console.log('geoPositionData', geoPositionData);
  console.log('cityName', cityName, 'countryName', countryName);
  const [latitude, longitude] = [...geoPositionData.loc.split(',')];
  console.log('latitude', latitude, 'longitude', longitude);

  // Get Weather Data
  const weatherData = await weather.getWeatherDataByPosition(latitude, longitude);
  console.log('weatherData', weatherData);

  // Get Image Data
  const imageData = await image.getImageUrl();
  console.log('imageData', imageData);

  // Set Map Data
  map.setMapPosition(latitude, longitude);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
