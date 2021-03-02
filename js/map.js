import { arrayHousing } from './data.js';
import { renderingCardElement } from './card.js';
import { pageInactiveState, pageActiveState } from './form.js';

pageInactiveState();
const mapCenterLat = 35.6895001;
const mapCenterLng = 139.6917100;
// const address = document.querySelector('#address');
// address.value = `${mapCenterLat}, ${mapCenterLng}`;
// address.setAttribute('readonly', 'true');
let L = window.L;
const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageActiveState();
    })
    .setView({
      lat: mapCenterLat,
      lng: mapCenterLng,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarkerIcon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const markerIcon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: mapCenterLat,
      lng: mapCenterLng,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );

  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const getLatLng = evt.target.getLatLng();
    const getLat = getLatLng.lat.toFixed(7);
    const getLng = getLatLng.lng.toFixed(7);
    const address = document.querySelector('#address');
    address.value = `${getLat}, ${getLng}`;
    address.setAttribute('readonly', 'true');
  });

  arrayHousing.forEach(element => {
    const arrayHousingLat = element.location.x;
    const arrayHousingLng = element.location.y;

    const marker = L.marker(
      {
        lat: arrayHousingLat,
        lng: arrayHousingLng,
      },
      {
        icon: markerIcon,
      },
    )
    marker
      .addTo(map)
      .bindPopup(
        renderingCardElement(element),
      );
  });
};

export { createMap };
