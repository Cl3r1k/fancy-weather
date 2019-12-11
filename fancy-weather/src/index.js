import './scss/main.scss';

const settings = require('./js/settings');
const map = require('./js/map');
const domHelper = require('./js/domHelper');

const initApp = async () => {
  await domHelper.generateAppData();

  domHelper.updateAppView();

  // Get Image Data
  await domHelper.changeBackgroundImage();

  // Set Map Data
  map.setMapPosition(settings.latitude, settings.longitude);

  domHelper.setDOMHandlers();

  domHelper.updateTime();
  setInterval(domHelper.updateTime, 6000);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
