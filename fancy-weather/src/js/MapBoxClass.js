const mapboxgl = require('mapbox-gl');
const config = require('./config');

class MapBoxClass {
  setMapPosition(latitude, longitude) {
    mapboxgl.accessToken = config.mapBoxAccessToken;
    this.mapBox = new mapboxgl.Map({
      container: 'idMap', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });
  }

  flyToPosition(latitude, longitude) {
    this.mapBox.flyTo({
      center: [longitude, latitude],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  }
}

module.exports = MapBoxClass;
