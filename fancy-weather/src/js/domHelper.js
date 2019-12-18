import settings from './settings/settings';
import interfaceConfig from './interfaceConfig';
import image from './image';
import weather from './weather';
import geoData from './geoData';
import helper from './helper';
import MapBoxClass from './MapBoxClass';

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

  // Set City Data
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${settings.cityName}, ${settings.countryName}`;

  // Set geo position
  const coordinatesElement = document.getElementById('idCoordinates');
  coordinatesElement.innerHTML = `${interfaceConfig.latitude[settings.language]}: ${helper.convertCoordinatesToTime(
    settings.latitude,
  )} <br> ${interfaceConfig.longitude[settings.language]}: ${helper.convertCoordinatesToTime(settings.longitude)}`;

  // Set weather data
  const currentTemperature = settings.isCelsius
    ? parseInt((settings.weatherData.currently.temperature - fahrenheitSubtrahend) / fahrenheitCoefficient)
    : parseInt(settings.weatherData.currently.temperature);
  const feelsLike = settings.isCelsius
    ? parseInt((settings.weatherData.currently.apparentTemperature - fahrenheitSubtrahend) / fahrenheitCoefficient)
    : parseInt(settings.weatherData.currently.apparentTemperature);
  const { windSpeed, humidity, icon } = settings.weatherData.currently;
  const weatherDescription = settings.weatherData.currently.summary;

  // Set weather data for Current day
  const weatherCardDetailedElement = document.querySelector('.weather-card-detailed');
  weatherCardDetailedElement.querySelector('.weather-card-temperature').textContent = `${currentTemperature}°`;
  weatherCardDetailedElement.querySelector('.weather-card-extra-info').innerHTML = `${
    interfaceConfig.weatherDescription[settings.language]
  }: <small>${weatherDescription}</small> <br>${interfaceConfig.feelsLike[settings.language]}: ${feelsLike}° <br>${
    interfaceConfig.wind[settings.language]
  }: ${windSpeed} ${interfaceConfig.windSpeed[settings.language]} <br>${
    interfaceConfig.humidity[settings.language]
  }: ${parseInt(humidity * humidityPercent)}%`;
  weatherCardDetailedElement
    .querySelector('.weather-card-icon')
    .setAttribute('src', `./assets/images/weather_icons/${icon}.png`);

  // Set weather data for Next days
  const weatherCardsElements = document.querySelectorAll('.weather-future .weather-card');
  weatherCardsElements.forEach((weatherCard, index) => {
    const currentDay = new Date();
    currentDay.setHours(0, 0, 0, 0);
    const weekDayIndex = (currentDay.getDay() + index + 1) % 7;
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

const saveSettings = () => {
  const settingsPreferences = { language: settings.language, isCelsius: settings.isCelsius };
  localStorage.setItem('settingsPreferences', JSON.stringify(settingsPreferences));
};

const loadSettings = () => {
  const data = localStorage.getItem('settingsPreferences');
  if (data) {
    const settingsPreferences = JSON.parse(data);
    settings.isCelsius = settingsPreferences.isCelsius;
    document.getElementById('idSwitchTemperatureButton').checked = settings.isCelsius;

    settings.language = settingsPreferences.language;
    const switchLanguageElement = document.getElementById('idSwitchLanguageControl');
    switch (settings.language) {
      case 'ru-RU':
        switchLanguageElement.value = '2';
        break;
      case 'be-BY':
        switchLanguageElement.value = '3';
        break;
      default:
        switchLanguageElement.value = '1';
        break;
    }
  }
};

const generateAppData = async (isInitialState = false) => {
  settings.latitude = settings.geoPositionData.results[0].geometry.lat;
  settings.longitude = settings.geoPositionData.results[0].geometry.lng;

  settings.cityName =
    settings.geoPositionData.results[0].components.city ||
    settings.geoPositionData.results[0].components.town ||
    settings.geoPositionData.results[0].components.village ||
    settings.geoPositionData.results[0].components.state ||
    settings.geoPositionData.results[0].components.country;
  settings.countryName =
    settings.geoPositionData.results[0].components.country || settings.geoPositionData.results[0].components.state;
  settings.timeZone = settings.geoPositionData.results[0].annotations.timezone.name;

  // Get Weather Data
  settings.weatherData = await weather.getWeatherDataByPosition(
    settings.latitude,
    settings.longitude,
    settings.language.substr(0, 2),
  );

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

  await generateAppData();
};

const generateAppDataByIP = async () => {
  // Get Geo Position
  try {
    const { coords } = await geoData.getCurrentPosition();
    settings.latitude = coords.latitude;
    settings.longitude = coords.longitude;
  } catch (error) {
    settings.geoPosition = await geoData.getGeoPosition();
    [settings.latitude, settings.longitude] = [...settings.geoPosition.loc.split(',')];
  }

  // Get Geo Position Data
  settings.geoPositionData = await geoData.getGeoPositionData(
    settings.latitude,
    settings.longitude,
    settings.language.substr(0, 2),
  );

  await generateAppData(true);
};

const changeBackgroundImage = async () => {
  const seasonPeriod = helper.getSeason(new Date());
  const dayPeriod = helper.getDayPeriod(
    new Date(),
    settings.geoPositionData.results[0].annotations.timezone.offset_sec,
  );

  try {
    const imageData = await image.getImageUrl(seasonPeriod, dayPeriod, settings.weatherData.currently.icon);
    document.getElementById('idBGImage').style.background = `url("${imageData.urls.regular}") 0% 0% / cover no-repeat`;
    localStorage.setItem('imageData', JSON.stringify(imageData));
  } catch (error) {
    // In Chrome - 403 error always appears, in this case load previous images
    const data = localStorage.getItem('imageData');
    if (data) {
      const imageData = JSON.parse(data);
      document.getElementById(
        'idBGImage',
      ).style.background = `url("${imageData.urls.regular}") 0% 0% / cover no-repeat`;
    }
  }
};

const generateAppDataBySearch = async searchValue => {
  if (searchValue.length > 1) {
    const searchResult = await geoData.searchByValueData(searchValue, settings.language.substr(0, 2));
    if (searchResult.results.length) {
      settings.geoPositionData = searchResult;
      await generateAppData();
      await changeBackgroundImage();
    }
  }
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
  saveSettings();
  updateAppView();
};

const searchHandler = async () => {
  const searchValue = document.getElementById('idSearchField').value;
  if (searchValue) {
    await generateAppDataBySearch(searchValue);
  }
};

const voiceSearchHandler = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition(); // Experimental not known definition for eslint
  recognition.interimResults = true;
  recognition.lang = settings.language;

  let recognitionResult = '';
  recognition.addEventListener('result', evt => {
    recognitionResult = evt.results['0']['0'].transcript;
  });

  recognition.addEventListener('end', async () => {
    if (recognitionResult) {
      document.getElementById('idSearchField').value = recognitionResult;
      await generateAppDataBySearch(recognitionResult);
    }
  });

  recognition.start();
};

const setDOMHandlers = () => {
  document.getElementById('idSwitchImageButton').addEventListener('click', changeBackgroundImage);
  document.getElementById('idSwitchLanguageControl').addEventListener('change', changeLanguage);
  document.getElementById('idSwitchTemperatureButton').addEventListener('change', changeTemperatureScale);
  document.getElementById('idSearchButton').addEventListener('click', searchHandler);
  document.getElementById('idSearchField').addEventListener('keypress', evt => {
    if (evt.key === 'Enter') {
      searchHandler();
    }
  });
  document.getElementById('idVoiceSearchIcon').addEventListener('click', voiceSearchHandler);
};

export default {
  updateAppView,
  setDOMHandlers,
  changeBackgroundImage,
  changeTemperatureScale,
  generateAppData,
  saveSettings,
  loadSettings,
  updateTime,
  generateAppDataByIP,
  generateAppDataBySearch,
  reBuildData,
};
