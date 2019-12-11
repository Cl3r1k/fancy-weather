const settings = require('./settings');
const image = require('./image');
const geoData = require('./geoData');

// --- Not related to DOM changes/events, consider to move to another file ---
const saveSettings = () => {
  localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
};

const generateAppData = async () => {
  // Get Geo Position
  settings.geoPosition = await geoData.getGeoPosition();
  // console.log('geoPosition', geoPosition);
  const [latitude, longitude] = [...settings.geoPosition.loc.split(',')];
  settings.latitude = latitude;
  settings.longitude = longitude;
  // console.log('latitude', latitude, 'longitude', longitude);

  // Get Geo Position Data
  settings.geoPositionData = await geoData.getGeoPositionData(settings.latitude, settings.longitude, settings.language);
  // console.log('settings.geoPositionData', settings.geoPositionData);

  settings.cityName = settings.geoPositionData.results[0].components.city;
  settings.countryName = settings.geoPositionData.results[0].components.country;
  // console.log('cityName', settings.cityName, 'countryName', settings.countryName);

  // Get Weather Data
  // settings.weatherData = await weather.getWeatherDataByPosition(latitude, longitude);
  // TODO: Do not forget to remove localStorage part
  // localStorage.setItem('weatherData', JSON.stringify(settings.weatherData));
  settings.weatherData = JSON.parse(localStorage.getItem('weatherData'));
  // console.log('settings.weatherData', settings.weatherData);
  saveSettings();
};

// ------------ Not related to DOM changes --------------------

const updateTime = () => {
  // Set time
  const currentDateTimeElement = document.getElementById('idCurrentDateTime');
  const dateTime = new Date();
  currentDateTimeElement.textContent = `${dateTime.toDateString()} ${dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })}`;
};

const updateAppView = () => {
  // Set City Data
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${settings.cityName}, ${settings.countryName}`;

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
    const averageTemperature =
      (settings.weatherData.daily.data[index + 1].temperatureLow +
        settings.weatherData.daily.data[index + 1].temperatureHigh) /
      2;
    const temperature = settings.isCelsius ? parseInt((averageTemperature - 32) / 1.8) : parseInt(averageTemperature);
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
  document.getElementById('idBGImage').style.background = `url("${imageData.urls.regular}") 0% 0% / cover no-repeat`;
};

const changeTemperatureScale = async () => {
  settings.isCelsius = !settings.isCelsius;
  updateAppView();
  saveSettings();
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
  saveSettings,
  updateTime,
};
