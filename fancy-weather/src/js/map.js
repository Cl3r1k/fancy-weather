const setMapPosition = (latitude, longitude) => {
  // eslint-disable-next-line no-undef
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2wzcjFrIiwiYSI6ImNrM3pscTR3YTB3anEzZ3A2c3hmczh4czAifQ.Kl84DrrMkQzUEMelJnJMwQ';
  // eslint-disable-next-line no-undef, no-unused-vars
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 11, // starting zoom
  });
};

module.exports = {
  setMapPosition,
};
