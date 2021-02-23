import {getRandomInclusive, getRandomArbitrary, getRandomElement, getRandomArray} from './util.js';

// Присвоение значений диапазону и Вызов функций
const AVATAR_IMG_MIN = 1;
const AVATAR_IMG_MAX = 8;
const ADVT_TITLE = 'About this space';
const LOCATION_X_MIN = 35.65000;
const LOCATION_X_MAX = 35.70000;
const LOCATION_X_ARBITRARY = 5;
const LOCATION_Y_MIN = 139.70000;
const LOCATION_Y_MAX = 139.80000;
const LOCATION_Y_ARBITRARY = 5;
const PRICE_MAX = 7;
const ROOMS_MAX = 8;
const QUESTS_MAX = 12;
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = 'Modern, stylish & spacious one bedroom apartment in central city. This is lower-ground entirely private apartment, 5 min walk railway station! Apartment offers a comfortable stay with fast unlimited Wifi access for Free plus Nespresso Cafe capsule and machines, flatscreen TV and all kitchenettes. ';
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const ARRAY_DECLARATION_COUNT = 10;

// Генерирует объект со свойствами
const createHousingObjects = function () {
  const avatarNumber = getRandomInclusive(AVATAR_IMG_MIN, AVATAR_IMG_MAX);
  const locationX = getRandomArbitrary(LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_X_ARBITRARY);
  const locationY = getRandomArbitrary(LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_Y_ARBITRARY);

  return {
    author: {
      avatar: 'img/avatars/user0' + avatarNumber + '.png',
    },
    offer: {
      title: ADVT_TITLE,
      address: `${locationX}, ${locationY}`,
      price: getRandomInclusive(1, PRICE_MAX),
      type: getRandomElement(HOUSING_TYPES),
      rooms: getRandomInclusive(1, ROOMS_MAX),
      guests: getRandomInclusive(1, QUESTS_MAX),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

// Возвращает массив длиной arrayCount, каждый элемент = createHousingObjects
const createHousingArray = function (arrayCount) {
  return new Array(arrayCount).fill(null).map(() => createHousingObjects());
};

const arrayHousing = createHousingArray(ARRAY_DECLARATION_COUNT);
//alert(arrayHousing);
//console.log(arrayHousing);

export { arrayHousing };
