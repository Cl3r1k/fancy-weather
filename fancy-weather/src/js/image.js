const config = require('./config');

const getImageUrl = async () => {
  const queryParams = `?orientation=landscape&per_page=1&query=nature&client_id=${config.unsplashAccessKey}`;
  const requestUrl = `${config.unsplashBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const imageData = await response.json();

  return imageData;
};

module.exports = {
  getImageUrl,
};
