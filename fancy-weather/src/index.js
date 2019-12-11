/* eslint-disable no-console */
import './scss/main.scss';

const geoPosition = require('./js/geoPosition');
const weather = require('./js/weather');
const image = require('./js/image');
const map = require('./js/map');
const domHelper = require('./js/domHelper');

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
  // TODO: Do not forget to remove localStorage part
  // localStorage.setItem('weatherData', JSON.stringify(weatherData));
  // const weatherData = JSON.parse(localStorage.getItem('weatherData'));
  console.log('weatherData', weatherData);

  // Get Image Data
  const imageData = await image.getImageUrl();
  // localStorage.setItem('imageData', JSON.stringify(imageData));
  // TODO: Do not forget to remove localStorage part
  // const imageData = JSON.parse(localStorage.getItem('imageData'));
  console.log('imageData', imageData);

  // Set Map Data
  map.setMapPosition(latitude, longitude);

  const isCelsius = true;
  domHelper.updateAppView(cityName, countryName, latitude, longitude, weatherData, isCelsius);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
