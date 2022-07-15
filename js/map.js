import {sendRequest, sendUserRequest} from './fetch.js';
import {onUserSuccess, onError, onSuccess} from './user-interface.js';
import {createUserTableRow} from './user-table.js';

const INITIAL_LAT = 59.92749;
const INITIAL_LNG = 30.31127;

const initialCoordinates = {lat: INITIAL_LAT, lng: INITIAL_LNG};

const Map = {
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  ZOOM: 11.5
}

const map = L.map('map-canvas');

L.tileLayer(
  Map.TILE,
  {
    attribution: Map.COPYRIGHT,
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const addPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const addPinIconVerified = L.icon({
  iconUrl: './img/pin-verified.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const similarContractor = (contractor) => {
  const {
    coords:{
      lat,
      lng
    }
  } = contractor;
  const adPins = L.marker({
    lat,
    lng, 
  },
  { 
    draggable: false,
    icon: addPinIcon,
  });

  adPins
  .addTo(markerGroup)
  .bindPopup(createUserTableRow(contractor));
  
};

const renderPins = (pins) => {
  pins.forEach((pin) => {
    similarContractor(pin);
  })
};


map.on('load', () => {
  sendRequest(onSuccess, onError, 'GET');
  sendUserRequest(onUserSuccess, onError, 'GET');
})

.setView({
  lat: INITIAL_LAT,
  lng: INITIAL_LNG,
}, Map.ZOOM);