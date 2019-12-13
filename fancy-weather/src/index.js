import './scss/main.scss';

// TODO: Refactor all Magic Numbers

const domHelper = require('./js/domHelper');

const initApp = async () => {
  await domHelper.generateAppDataByIP();

  // Get Image Data
  await domHelper.changeBackgroundImage();

  domHelper.setDOMHandlers();

  const updateDelay = 6000; // 60 seconds
  setInterval(domHelper.updateTime, updateDelay);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
