import { getHousingType } from './util.js';
import { pageInactiveState, pageActiveState } from './form.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

pageInactiveState();
const mapCenterLat = 35.6895001;
const mapCenterLng = 139.6917100;
let L = window.L;
const createMap = (arrayHousing) => {
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

  arrayHousing.forEach(({ author, offer, location }) => {
    const arrayHousingLat = location.lat;
    const arrayHousingLng = location.lng;

    const renderingCardElement = () => {
      const housingElement = cardTemplate.cloneNode(true);

      const housingType = getHousingType(offer.type);
      housingElement.querySelector('.popup__type').textContent = housingType;

      // наполняем данными
      if (author.avatar) {
        housingElement.querySelector('.popup__avatar').src = author.avatar;
      } else {
        housingElement.querySelector('.popup__avatar').classList.add('hidden');
      }
      if (offer.title) {
        housingElement.querySelector('.popup__title').textContent = offer.title;
      } else {
        housingElement.querySelector('.popup__title').classList.add('hidden');
      }
      if (offer.address) {
        housingElement.querySelector('.popup__text--address').textContent = offer.address;
      } else {
        housingElement.querySelector('.popup__text--address').classList.add('hidden');
      }
      if (offer.price) {
        housingElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
      } else {
        housingElement.querySelector('.popup__text--price').classList.add('hidden');
      }
      if (offer.rooms || offer.guests) {
        housingElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
      } else {
        housingElement.querySelector('.popup__text--capacity').classList.add('hidden');
      }
      if (offer.checkin || offer.checkout) {
        housingElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
      } else {
        housingElement.querySelector('.popup__text--time').classList.add('hidden');
      }
      if (offer.description) {
        housingElement.querySelector('.popup__description').textContent = offer.description;
      } else {
        housingElement.querySelector('.popup__description').classList.add('hidden');
      }
      if ((offer.features).length > 0) {
        // создать li.popup__feature c class popup__feature--  в popup__features
        housingElement.querySelector('.popup__features').textContent = ' ';
        const featuresList = housingElement.querySelector('.popup__features');
        offer.features.forEach((element) => {
          const featuresItem = document.createElement('li');
          featuresItem.classList.add('popup__feature');
          const featuresClass = `popup__feature--${element}`;
          featuresItem.classList.add(featuresClass);
          featuresList.append(featuresItem);
        });
      } else {
        housingElement.querySelector('.popup__features').classList.add('hidden');
      }
      if ((offer.photos).length > 0) {
        // создать img.popup__photo в popup__photos
        housingElement.querySelector('.popup__photos').textContent = ' ';
        const photoList = housingElement.querySelector('.popup__photos');
        offer.photos.forEach((photo) => {
          const photoImg = new Image(45, 40);
          photoImg.classList.add('popup__photo');
          photoImg.src = photo;
          photoList.append(photoImg);
        });

      } else {
        housingElement.querySelector('.popup__photos').classList.add('hidden');
      }

      return housingElement;
    };

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
        renderingCardElement(arrayHousing),
      );
  });
};

export { createMap };
