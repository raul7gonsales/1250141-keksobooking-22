import { mapCenterLat, mapCenterLng } from './util.js';
import { pageInactiveState, pageActiveState } from './form.js';
import { renderingCardElement } from './card.js';
import { filterDeclarations } from './filter.js';

const ICON_SIZE_WIDTH = 52;
const ICON_SIZE_HEIGHT = 52;
const ICON_ANCHOR_WIDTH = 26;
const ICON_ANCHOR_HEIGHT = 52;
const DECLARATION_COUNT = 10;

pageInactiveState();
let L = window.L;
const map = L.map('map-canvas')
  .on('load', () => {
    pageActiveState();
  })
  .setView({
    lat: mapCenterLat,
    lng: mapCenterLng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainMarkerIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});

const markerIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
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
  const getlng = getLatLng.lng.toFixed(7);
  const address = document.querySelector('#address');
  address.value = `${getLat}, ${getlng}`;
  address.setAttribute('readonly', 'true');
});

const markerLayer = L.layerGroup().addTo(map);

const renderMarkers = (declarations) => {
  markerLayer.clearLayers();
  const filteredData = filterDeclarations(declarations).slice(0, DECLARATION_COUNT);
  filteredData.forEach(({ author, offer, location }) => {
    const declarationsLat = location.lat;
    const declarationsLng = location.lng;

    const marker = L.marker(
      {
        lat: declarationsLat,
        lng: declarationsLng,
      },
      {
        icon: markerIcon,
      },
    )
    marker
      .addTo(markerLayer)
      .bindPopup(
        renderingCardElement(author, offer),
      );
  })
}
export { renderMarkers };
