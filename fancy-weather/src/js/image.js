const config = require('./config');

const getImageUrl = async (season = 'winter', dayPeriod = 'day', weather = 'clear') => {
  const tags = `nature+${season}+${dayPeriod}+${weather}`;
  const queryParams = `?orientation=landscape&per_page=1&query=${tags}&client_id=${config.unsplashAccessKey}`;
  const requestUrl = `${config.unsplashBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const imageData = await response.json();

  return imageData;
};

export default {
  getImageUrl,
};
