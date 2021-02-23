import { getHousingType } from './util.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const generatedFragment = document.createDocumentFragment();


const renderingCardElement = ({ author, offer }) => {
  const housingElement = cardTemplate.cloneNode(true);
  const offerType = getHousingType(offer.type);
  const housingImageX = 45;
  const housingImageY = 40;
  housingElement.querySelector('.popup__type').textContent = offerType;

  // Добавляем данные в попап
  if (author.avatar) {
    housingElement.querySelector('.popup__avatar').textContent = author.avatar;
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
    housingElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
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
  if (offer.features.length > 0) {
    // создаем элементы списка с каждой feature
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
  if (offer.photos.length > 0) {
    // создаем фото
    housingElement.querySelector('.popup__photos').textContent = ' ';
    const photoList = housingElement.querySelector('.popup__photos');
    offer.photos.forEach((photo) => {
      const photoImg = new Image(housingImageX, housingImageY);
      photoImg.classList.add('popup__photo');
      photoImg.src = photo;
      photoList.append(photoImg);
    });

  } else {
    housingElement.querySelector('.popup__photos').classList.add('hidden');
  }

  // присвоение дочерних эл-тов в DOM
  generatedFragment.appendChild(housingElement);
  return mapCanvas.appendChild(generatedFragment);
};

export { renderingCardElement };
