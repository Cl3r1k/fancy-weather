const settings = require('./settings');
const image = require('./image');
const weather = require('./weather');
const geoData = require('./geoData');
const map = require('./map');
const helper = require('./helper');

const updateTime = () => {
  // Set time
  const currentDateTimeElement = document.getElementById('idCurrentDateTime');
  const dateTime = new Date();

  currentDateTimeElement.textContent = `${
    settings.interface.weekDayShort[settings.language][dateTime.getDay()]
  }, ${dateTime.getDate()} ${
    settings.interface.month[settings.language][dateTime.getMonth()]
  } ${dateTime.getFullYear()} ${dateTime.toLocaleTimeString(settings.language, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: settings.timeZone,
  })}`;
};

const updateAppView = () => {
  const humidityPercent = 100;
  const fahrenheitSubtrahend = 32;
  const fahrenheitCoefficient = 1.8;

  // Set City Data
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${settings.cityName}, ${settings.countryName}`;

  // Set geo position
  const coordinatesElement = document.getElementById('idCoordinates');
  const [lat, long] = [settings.latitude, settings.longitude].map(coordinate => `${coordinate}'`.replace('.', `°`));
  coordinatesElement.innerHTML = `${settings.interface.latitude[settings.language]}: ${lat} <br> ${
    settings.interface.longitude[settings.language]
  }: ${long}`;

  // Set weather data
  const currentTemperature = settings.isCelsius
    ? parseInt((settings.weatherData.currently.temperature - fahrenheitSubtrahend) / fahrenheitCoefficient)
    : parseInt(settings.weatherData.currently.temperature);
  // console.log('currentTemperature', currentTemperature);
  const feelsLike = settings.isCelsius
    ? parseInt((settings.weatherData.currently.apparentTemperature - fahrenheitSubtrahend) / fahrenheitCoefficient)
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
  weatherCardDetailedElement.querySelector('.weather-card-extra-info').innerHTML = `${
    settings.interface.feelsLike[settings.language]
  }: ${feelsLike}° <br>${settings.interface.wind[settings.language]}: ${windSpeed} ${
    settings.interface.windSpeed[settings.language]
  } <br>${settings.interface.humidity[settings.language]}: ${humidity * humidityPercent}%`;
  weatherCardDetailedElement
    .querySelector('.weather-card-icon')
    .setAttribute('src', `./assets/images/weather_icons/${icon}.png`);

  // Set weather data for Next days
  const weatherCardsElements = document.querySelectorAll('.weather-future .weather-card');
  // console.log('weatherCardsElements', weatherCardsElements);
  weatherCardsElements.forEach((weatherCard, index) => {
    // console.log('weatherData.daily.data[index]', weatherData.daily.data[index + 1]);
    const weekDayIndex = new Date(settings.weatherData.daily.data[index + 1].time * 1000).getDay();
    // console.log('weekDay', weekDay);
    const averageTemperature =
      (settings.weatherData.daily.data[index + 1].temperatureLow +
        settings.weatherData.daily.data[index + 1].temperatureHigh) /
      2;
    const temperature = settings.isCelsius
      ? parseInt((averageTemperature - fahrenheitSubtrahend) / fahrenheitCoefficient)
      : parseInt(averageTemperature);
    weatherCard.querySelector('.weather-card-day').textContent =
      settings.interface.weekDay[settings.language][weekDayIndex];
    weatherCard.querySelector('.weather-card-temperature').textContent = `${temperature}°`;
    weatherCard
      .querySelector('.weather-card-icon')
      .setAttribute('src', `./assets/images/weather_icons/${settings.weatherData.daily.data[index + 1].icon}.png`);
  });

  document
    .getElementById('idSearchField')
    .setAttribute('placeholder', settings.interface.searchPlaceholder[settings.language]);
  document.getElementById('idSearchButton').textContent = settings.interface.search[settings.language];

  updateTime();
};

// --- Not related to DOM changes/events, consider to move to another file ---
const saveSettings = () => {
  localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
};

const generateAppData = async () => {
  // console.log('generateAppData() --- settings.geoPositionData', settings.geoPositionData);
  settings.latitude = settings.geoPositionData.results[0].geometry.lat;
  settings.longitude = settings.geoPositionData.results[0].geometry.lng;
  // console.log('settings.latitude', settings.latitude, 'settings.longitude', settings.longitude);

  settings.cityName =
    settings.geoPositionData.results[0].components.city !== undefined
      ? settings.geoPositionData.results[0].components.city
      : settings.geoPositionData.results[0].components.state;
  settings.countryName = settings.geoPositionData.results[0].components.country;
  settings.timeZone = settings.geoPositionData.results[0].annotations.timezone.name;
  // console.log('cityName', settings.cityName, 'countryName', settings.countryName);

  // Get Weather Data
  settings.weatherData = await weather.getWeatherDataByPosition(settings.latitude, settings.longitude);
  // TODO: Do not forget to remove localStorage part
  // localStorage.setItem('weatherData', JSON.stringify(settings.weatherData));
  // settings.weatherData = JSON.parse(localStorage.getItem('weatherData'));
  // console.log('generateAppData() settings.weatherData', settings.weatherData);

  // Set Map Data
  map.setMapPosition(settings.latitude, settings.longitude);

  updateAppView();

  // Save settings in localStorage
  saveSettings();
};

const reBuildData = async () => {
  settings.geoPositionData = await geoData.getGeoPositionData(
    settings.latitude,
    settings.longitude,
    settings.language.substr(0, 2),
  );
  // console.log('settings.geoPositionData', settings.geoPositionData);

  await generateAppData();
};

const generateAppDataByIP = async () => {
  // Get Geo Position
  // console.log('generateAppDataByIP() called');
  settings.geoPosition = await geoData.getGeoPosition();
  // console.log('settings.geoPosition', settings.geoPosition);
  const [latitude, longitude] = [...settings.geoPosition.loc.split(',')];

  // Get Geo Position Data
  settings.geoPositionData = await geoData.getGeoPositionData(latitude, longitude, settings.language.substr(0, 2));
  // console.log('settings.geoPositionData', settings.geoPositionData);

  await generateAppData();
};

const generateAppDataBySearch = async searchValue => {
  settings.geoPositionData = await geoData.searchByValueData(searchValue, settings.language.substr(0, 2));
  // console.log('generateAppDataBySearch() settings.geoPositionData', settings.geoPositionData);
  await generateAppData();
};

// ------------ Not related to DOM changes --------------------

const changeBackgroundImage = async () => {
  const seasonPeriod = helper.getSeason(new Date());
  const dayPeriod = helper.getDayPeriod(
    new Date(),
    settings.geoPositionData.results[0].annotations.timezone.offset_sec,
  );
  const imageData = await image.getImageUrl(seasonPeriod, dayPeriod, settings.weatherData.currently.summary);
  // localStorage.setItem('imageData', JSON.stringify(imageData));
  // TODO: Do not forget to remove localStorage part
  // const imageData = JSON.parse(localStorage.getItem('imageData'));
  // console.log('imageData', imageData);
  // console.log('imageData.urls.regular', imageData.urls.regular);
  document.getElementById('idBGImage').style.background = `url("${imageData.urls.regular}") 0% 0% / cover no-repeat`;
};

const changeLanguage = event => {
  switch (event.target.value) {
    case '2':
      settings.language = 'ru-RU';
      break;
    case '3':
      settings.language = 'be-BY';
      break;
    default:
      settings.language = 'en-US';
      break;
  }

  reBuildData();
};

const changeTemperatureScale = async () => {
  settings.isCelsius = !settings.isCelsius;
  updateAppView();
  saveSettings();
};

const searchHandler = async () => {
  const searchValue = document.getElementById('idSearchField').value;
  // console.log('searchValue', searchValue);
  // TODO: Check search with random value for example - 'asf3asfsad', or with countyName - Canada
  if (searchValue) {
    generateAppDataBySearch(searchValue);
  }
};

const setDOMHandlers = () => {
  document.getElementById('idSwitchImageButton').addEventListener('click', changeBackgroundImage);
  document.getElementById('idSwitchLanguageControl').addEventListener('change', changeLanguage);
  document.getElementById('idSwitchTemperatureButton').addEventListener('click', changeTemperatureScale);
  document.getElementById('idSearchButton').addEventListener('click', searchHandler);
};

module.exports = {
  updateAppView,
  setDOMHandlers,
  changeBackgroundImage,
  changeTemperatureScale,
  generateAppData,
  saveSettings,
  updateTime,
  generateAppDataByIP,
  generateAppDataBySearch,
  reBuildData,
};
