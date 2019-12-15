import './scss/main.scss';

const domHelper = require('./js/domHelper');

const initApp = async () => {
  await domHelper.generateAppDataByIP();

  // TODO: Add JSdoc to methods
  // TODO: Move interface config to separate file

  // Get Image Data
  await domHelper.changeBackgroundImage();

  domHelper.setDOMHandlers();

  const updateDelay = 6000; // 60 seconds
  setInterval(domHelper.updateTime, updateDelay);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
