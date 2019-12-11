const settings = require('./settings');
const image = require('./image');
const geoPosition = require('./geoPosition');

// Not related to DOM changes/events, consider to move to another file
const generateAppData = async () => {
  // Get Position Data
  settings.geoPositionData = await geoPosition.getGeoPosition();
  settings.cityName = settings.geoPositionData.city;
  settings.countryName = settings.geoPositionData.country;
  // console.log('geoPositionData', geoPositionData);
  // console.log('cityName', cityName, 'countryName', countryName);
  const [latitude, longitude] = [...settings.geoPositionData.loc.split(',')];
  settings.latitude = latitude;
  settings.longitude = longitude;
  // console.log('latitude', latitude, 'longitude', longitude);

  // Get Weather Data
  // settings.weatherData = await weather.getWeatherDataByPosition(latitude, longitude);
  // TODO: Do not forget to remove localStorage part
  // localStorage.setItem('weatherData', JSON.stringify(settings.weatherData));
  settings.weatherData = JSON.parse(localStorage.getItem('weatherData'));
  // console.log('settings.weatherData', settings.weatherData);
};
// ------------ Not related to DOM changes --------------------

const updateAppView = () => {
  // Set City Data
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${settings.cityName}, ${settings.countryName}`;

  // Set time
  const currentDateTimeElement = document.getElementById('idCurrentDateTime');
  const dateTime = new Date();
  currentDateTimeElement.textContent = `${dateTime.toDateString()} ${dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })}`;

  // Set geo position
  const coordinatesElement = document.getElementById('idCoordinates');
  const [lat, long] = [settings.latitude, settings.longitude].map(coordinate => `${coordinate}'`.replace('.', `°`));
  coordinatesElement.innerHTML = `Latitude: ${lat} <br> Longitude: ${long}`;

  // Set weather data
  const currentTemperature = settings.isCelsius
    ? parseInt((settings.weatherData.currently.temperature - 32) / 1.8)
    : parseInt(settings.weatherData.currently.temperature);
  // console.log('currentTemperature', currentTemperature);
  const feelsLike = settings.isCelsius
    ? parseInt((settings.weatherData.currently.apparentTemperature - 32) / 1.8)
    : parseInt(settings.weatherData.currently.apparentTemperature);
  // console.log('feelsLike', feelsLike);
  const { windSpeed, humidity, icon } = settings.weatherData.currently;
  // console.log('windSpeed', windSpeed);
  // console.log('humidity', `${humidity * 100}%`);
  // console.log('icon', icon);

  // Set weather data for Current day
  const weatherCardDetailedElement = document.querySelector('.weather-card-detailed');
  // console.log('weatherCardDetailedElement', weatherCardDetailedElement);
  weatherCardDetailedElement.querySelector('.weather-card-temperature').textContent = `${currentTemperature}°`;
  weatherCardDetailedElement.querySelector(
    '.weather-card-extra-info',
  ).innerHTML = `Feels like: ${feelsLike}° <br>Wind: ${windSpeed} m/s <br>Humidity: ${humidity * 100}%`;
  weatherCardDetailedElement
    .querySelector('.weather-card-icon')
    .setAttribute('src', `./assets/images/weather_icons/${icon}.png`);

  // Set weather data for Nex days
  const weatherCardsElements = document.querySelectorAll('.weather-future .weather-card');
  // console.log('weatherCardsElements', weatherCardsElements);
  weatherCardsElements.forEach((weatherCard, index) => {
    // console.log('weatherData.daily.data[index]', weatherData.daily.data[index + 1]);
    const weekDay = new Date(settings.weatherData.daily.data[index + 1].time * 1000).toLocaleDateString('en-EN', {
      weekday: 'long',
    });
    // console.log('weekDay', weekDay);
    const temperature = settings.isCelsius
      ? parseInt((settings.weatherData.daily.data[index + 1].temperatureMin - 32) / 1.8)
      : parseInt(settings.weatherData.daily.data[index + 1].temperatureMin);
    weatherCard.querySelector('.weather-card-day').textContent = weekDay;
    weatherCard.querySelector('.weather-card-temperature').textContent = `${temperature}°`;
    weatherCard
      .querySelector('.weather-card-icon')
      .setAttribute('src', `./assets/images/weather_icons/${settings.weatherData.daily.data[index + 1].icon}.png`);
  });
};

const changeBackgroundImage = async () => {
  const imageData = await image.getImageUrl();
  // localStorage.setItem('imageData', JSON.stringify(imageData));
  // TODO: Do not forget to remove localStorage part
  // const imageData = JSON.parse(localStorage.getItem('imageData'));
  // console.log('imageData', imageData);
  // console.log('imageData.urls.regular', imageData.urls.regular);
  document.getElementById('idBGImage').style.background = `url("${imageData.urls.regular}") no-repeat`;
  document.getElementById('idBGImage').style.backgroundSize = 'cover';
};

const changeTemperatureScale = async () => {
  settings.isCelsius = !settings.isCelsius;
  updateAppView();
};

const setDOMHandlers = () => {
  document.getElementById('idSwitchImageButton').addEventListener('click', changeBackgroundImage);
  // document.getElementById('idSwitchLanguageButton').addEventListener('click', changeBackgroundImage);
  document.getElementById('idSwitchTemperatureButton').addEventListener('click', changeTemperatureScale);
};

module.exports = {
  updateAppView,
  setDOMHandlers,
  changeBackgroundImage,
  changeTemperatureScale,
  generateAppData,
};
