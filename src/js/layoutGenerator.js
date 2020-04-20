const imageElement = (classNames, src, alt) => {
  const image = document.createElement('img');
  if (classNames.length) {
    classNames.split(' ').forEach(className => {
      image.classList.add(className);
    });
  }
  image.src = src || '';
  image.alt = alt || '';
  return image;
};

const textElement = (classNames, textContent, id) => {
  const text = document.createElement('p');
  if (classNames.length) {
    classNames.split(' ').forEach(className => {
      text.classList.add(className);
    });
  }
  text.textContent = textContent || '';
  text.id = id || '';
  return text;
};

const h3TextElement = (classNames, textContent, id) => {
  const h3Text = document.createElement('h3');
  if (classNames.length) {
    classNames.split(' ').forEach(className => {
      h3Text.classList.add(className);
    });
  }
  h3Text.textContent = textContent || '';
  h3Text.id = id || '';
  return h3Text;
};

const inputElement = (className, id, type, value, checked = false, placeholder) => {
  const input = document.createElement('input');
  input.classList.add(className);
  input.id = id;
  input.type = type;
  input.value = value || '';
  input.checked = checked;
  input.placeholder = placeholder || '';
  return input;
};

const checkboxStyledElement = () => {
  const checkboxStyled = document.createElement('div');
  checkboxStyled.classList.add('checkbox-styled');
  const label = document.createElement('label');
  label.setAttribute('for', 'idSwitchTemperatureButton');
  checkboxStyled.prepend(
    inputElement('switch-temperature-control', 'idSwitchTemperatureButton', 'checkbox', '1', true),
    label,
  );
  return checkboxStyled;
};

const selectControlElement = () => {
  const select = document.createElement('select');
  select.classList.add('switch-language-control');
  select.id = 'idSwitchLanguageControl';
  select.name = 'switch-language';
  const option1 = document.createElement('option');
  option1.value = '1';
  option1.textContent = 'EN';
  const option2 = document.createElement('option');
  option2.value = '2';
  option2.textContent = 'RU';
  const option3 = document.createElement('option');
  option3.value = '3';
  option3.textContent = 'BE';
  select.prepend(option1, option2, option3);
  return select;
};

const buttonElement = (className, id, textContent) => {
  const button = document.createElement('button');
  button.classList.add(className);
  button.id = id || '';
  button.textContent = textContent || '';
  return button;
};

const divElement = (divClass, divId = null) => {
  const div = document.createElement('div');
  div.classList.add(divClass);
  div.id = divId || '';
  div.prepend();
  return div;
};

const controlsContainerElement = () => {
  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('controls-container');
  controlsContainer.prepend(
    buttonElement('switch-image-control', 'idSwitchImageButton'),
    selectControlElement(),
    checkboxStyledElement(),
  );
  return controlsContainer;
};

const searchControlsElement = () => {
  const searchControls = document.createElement('div');
  searchControls.classList.add('search-controls');
  searchControls.prepend(
    buttonElement('search-control-voice', 'idVoiceSearchIcon'),
    buttonElement('search-control-button', 'idSearchButton', 'Search'),
  );
  return searchControls;
};

const weatherCardDetailedElement = (extra = true, dayText) => {
  const weatherCardDetailed = document.createElement('section');
  weatherCardDetailed.classList.add('weather-card');
  if (extra) {
    weatherCardDetailed.classList.add('weather-card-detailed');
    const textP1 = textElement('weather-card-city', 'Moscow, Russia 111', 'idCityName');
    weatherCardDetailed.append(textP1);
  }

  const textP2 = textElement(
    `weather-card-day${extra ? ' format-normal' : ''}`,
    'Mon 09 December 16:41',
    'idCurrentDateTime',
  );
  textP2.textContent = dayText || '';
  weatherCardDetailed.append(textP2);

  const weatherCardDetailsBlock = document.createElement('div');
  weatherCardDetailsBlock.classList.add('weather-card-details-block');
  const h3Text = h3TextElement(`weather-card-temperature${extra ? ' big-card-text' : ''}`, '10°');
  const weatherCardExtendedInfoBlock = divElement('weather-card-extended-info-block');
  weatherCardExtendedInfoBlock.append(
    imageElement(
      `weather-card-icon${extra ? ' big-card-icon' : ''}`,
      './assets/images/weather_icons/cloudy.png',
      'weather icon',
    ),
  );

  if (extra) {
    weatherCardExtendedInfoBlock.append(textElement('weather-card-extra-info', 'Feels like: 7°'));
  }
  weatherCardDetailsBlock.append(h3Text, weatherCardExtendedInfoBlock);

  weatherCardDetailed.append(weatherCardDetailsBlock);

  return weatherCardDetailed;
};

const weatherTodayElement = () => {
  const weatherToday = document.createElement('div');
  weatherToday.classList.add('weather-today');
  weatherToday.prepend(weatherCardDetailedElement(true, 'Mon 09 December 16:41'));
  return weatherToday;
};

const weatherFutureElement = () => {
  const weatherFuture = document.createElement('div');
  weatherFuture.classList.add('weather-future');
  weatherFuture.prepend(
    weatherCardDetailedElement(false, 'Tuesday'),
    weatherCardDetailedElement(false, 'Wednesday'),
    weatherCardDetailedElement(false, 'Thursday'),
  );
  return weatherFuture;
};

const weatherContainerElement = () => {
  const searchControls = document.createElement('div');
  searchControls.classList.add('weather-container');
  searchControls.prepend(weatherTodayElement(), weatherFutureElement());
  return searchControls;
};

const mapWrapperElement = () => {
  const mapContainer = document.createElement('div');
  mapContainer.classList.add('map-wrapper');
  mapContainer.prepend(divElement('map', 'idMap'));
  return mapContainer;
};

const coordinatesBlockElement = () => {
  const coordinatesBlock = document.createElement('div');
  coordinatesBlock.classList.add('coordinates-block');
  coordinatesBlock.prepend(textElement('coordinates-text', `Latitude: 53°54' Longitude: 27°34'`, 'idCoordinates'));
  return coordinatesBlock;
};

const mapContainerElement = () => {
  const searchControls = document.createElement('div');
  searchControls.classList.add('map-container');
  searchControls.prepend(mapWrapperElement(), coordinatesBlockElement());
  return searchControls;
};

const searchContainerElement = () => {
  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('search-container');
  controlsContainer.prepend(
    inputElement('search-input', 'idSearchField', 'text', '', false, 'Search city or ZIP'),
    searchControlsElement(),
  );
  return controlsContainer;
};

const headerElement = () => {
  const header = document.createElement('header');
  header.classList.add('header-container');
  header.classList.add('wrapper');
  header.prepend(controlsContainerElement(), searchContainerElement());
  return header;
};

const mainElement = () => {
  const main = document.createElement('main');
  main.classList.add('main-container');
  main.classList.add('wrapper');
  main.prepend(weatherContainerElement(), mapContainerElement());
  return main;
};

const footerElement = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer-container');
  footer.classList.add('wrapper');
  footer.prepend(textElement('credits', 'Made with coffee by Cl3r1k'));
  return footer;
};

const renderLayout = () => {
  document.body.prepend(divElement('background-image', 'idBGImage'), headerElement(), mainElement(), footerElement());
};

export default {
  renderLayout,
  imageElement,
  textElement,
  h3TextElement,
  inputElement,
  checkboxStyledElement,
  selectControlElement,
  buttonElement,
  divElement,
  controlsContainerElement,
  searchControlsElement,
  weatherCardDetailedElement,
  weatherTodayElement,
  weatherFutureElement,
  weatherContainerElement,
  mapWrapperElement,
  coordinatesBlockElement,
  mapContainerElement,
  searchContainerElement,
  headerElement,
  mainElement,
  footerElement,
};
