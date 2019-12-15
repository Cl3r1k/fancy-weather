const settings = require('./settings');
const interfaceConfig = require('./interfaceConfig');
const image = require('./image');
const weather = require('./weather');
const geoData = require('./geoData');
const helper = require('./helper');
const MapBoxClass = require('./MapBoxClass');

const mapBoxClassInstance = new MapBoxClass();

const updateTime = () => {
  // Set time
  const currentDateTimeElement = document.getElementById('idCurrentDateTime');
  const dateTime = new Date();

  currentDateTimeElement.textContent = `${
    interfaceConfig.weekDayShort[settings.language][dateTime.getDay()]
  }, ${dateTime.getDate()} ${
    interfaceConfig.month[settings.language][dateTime.getMonth()]
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
  const millisecondsValue = 1000;

  // Set City Data
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${settings.cityName}, ${settings.countryName}`;

  // Set geo position
  const coordinatesElement = document.getElementById('idCoordinates');
  const [lat, long] = [settings.latitude, settings.longitude].map(coordinate => `${coordinate}'`.replace('.', `°`));
  coordinatesElement.innerHTML = `${interfaceConfig.latitude[settings.language]}: ${lat} <br> ${
    interfaceConfig.longitude[settings.language]
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
    interfaceConfig.feelsLike[settings.language]
  }: ${feelsLike}° <br>${interfaceConfig.wind[settings.language]}: ${windSpeed} ${
    interfaceConfig.windSpeed[settings.language]
  } <br>${interfaceConfig.humidity[settings.language]}: ${humidity * humidityPercent}%`;
  weatherCardDetailedElement
    .querySelector('.weather-card-icon')
    .setAttribute('src', `./assets/images/weather_icons/${icon}.png`);

  // Set weather data for Next days
  const weatherCardsElements = document.querySelectorAll('.weather-future .weather-card');
  // console.log('weatherCardsElements', weatherCardsElements);
  weatherCardsElements.forEach((weatherCard, index) => {
    // console.log('weatherData.daily.data[index]', weatherData.daily.data[index + 1]);
    const weekDayIndex = new Date(settings.weatherData.daily.data[index + 1].time * millisecondsValue).getDay();
    // console.log('weekDay', weekDay);
    const averageTemperature =
      (settings.weatherData.daily.data[index + 1].temperatureLow +
        settings.weatherData.daily.data[index + 1].temperatureHigh) /
      2;
    const temperature = settings.isCelsius
      ? parseInt((averageTemperature - fahrenheitSubtrahend) / fahrenheitCoefficient)
      : parseInt(averageTemperature);
    weatherCard.querySelector('.weather-card-day').textContent =
      interfaceConfig.weekDay[settings.language][weekDayIndex];
    weatherCard.querySelector('.weather-card-temperature').textContent = `${temperature}°`;
    weatherCard
      .querySelector('.weather-card-icon')
      .setAttribute('src', `./assets/images/weather_icons/${settings.weatherData.daily.data[index + 1].icon}.png`);
  });

  document
    .getElementById('idSearchField')
    .setAttribute('placeholder', interfaceConfig.searchPlaceholder[settings.language]);
  document.getElementById('idSearchButton').textContent = interfaceConfig.search[settings.language];

  updateTime();
};

// --- Not related to DOM changes/events, consider to move to another file ---
const saveSettings = () => {
  localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
};

const generateAppData = async (isInitialState = false) => {
  // console.log('generateAppData() --- settings.geoPositionData', settings.geoPositionData);
  settings.latitude = settings.geoPositionData.results[0].geometry.lat;
  settings.longitude = settings.geoPositionData.results[0].geometry.lng;
  // console.log('settings.latitude', settings.latitude, 'settings.longitude', settings.longitude);

  settings.cityName =
    settings.geoPositionData.results[0].components.city ||
    settings.geoPositionData.results[0].components.town ||
    settings.geoPositionData.results[0].components.village ||
    settings.geoPositionData.results[0].components.county ||
    settings.geoPositionData.results[0].components.state;
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
  if (isInitialState) {
    mapBoxClassInstance.setMapPosition(settings.latitude, settings.longitude);
  } else {
    mapBoxClassInstance.flyToPosition(settings.latitude, settings.longitude);
  }

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

  await generateAppData(true);
};

const generateAppDataBySearch = async searchValue => {
  const searchResult = await geoData.searchByValueData(searchValue, settings.language.substr(0, 2));
  if (searchResult.results.length) {
    settings.geoPositionData = searchResult;
    // console.log('generateAppDataBySearch() settings.geoPositionData', settings.geoPositionData);
    await generateAppData();
  }
};

// ------------ Not related to DOM changes --------------------

const changeBackgroundImage = async () => {
  const seasonPeriod = helper.getSeason(new Date());
  const dayPeriod = helper.getDayPeriod(
    new Date(),
    settings.geoPositionData.results[0].annotations.timezone.offset_sec,
  );
  const imageData = await image.getImageUrl(seasonPeriod, dayPeriod, settings.weatherData.currently.summary);
  // console.log('changeBackgroundImage() dayPeriod', dayPeriod);
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
  if (searchValue) {
    await generateAppDataBySearch(searchValue);
    await changeBackgroundImage();
  }
};

const voiceSearchHandler = async () => {
  mapBoxClassInstance.flyToPosition(55.75, 37.61);
};

const setDOMHandlers = () => {
  document.getElementById('idSwitchImageButton').addEventListener('click', changeBackgroundImage);
  document.getElementById('idSwitchLanguageControl').addEventListener('change', changeLanguage);
  document.getElementById('idSwitchTemperatureButton').addEventListener('click', changeTemperatureScale);
  document.getElementById('idSearchButton').addEventListener('click', searchHandler);
  document.getElementById('idSearchField').addEventListener('keypress', evt => {
    if (evt.key === 'Enter') {
      searchHandler();
    }
  });
  document.getElementById('idVoiceSearchIcon').addEventListener('click', voiceSearchHandler);
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
