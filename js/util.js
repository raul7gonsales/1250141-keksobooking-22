const ALERT_SHOW_TIME = 5000;
const mapCenterLat = 35.6895001;
const mapCenterLng = 139.6917100;
const minPriceFlat = 1000;
const minPriceBungalow = 0;
const minPriceHouse = 5000;
const minPricePalace = 10000;

// Возвращает случайное целое число из диапазона (включительно)
const getRandomInclusive = (min, max) => {
  if ((min >= max) || (min < 0) || (max < 0)) {
    alert('Неверное значение диапазона');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Возвращает тип жилья
const getHousingType = (types) => {
  switch (types) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Любой тип жилья';
  }
};

const getPriceMinValue = (typeSelectValue) => {
  switch (typeSelectValue) {
    case 'flat':
      return minPriceFlat;
    case 'bungalow':
      return minPriceBungalow;
    case 'house':
      return minPriceHouse;
    case 'palace':
      return minPricePalace;
    default:
      return 0;
  }
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc' || evt.code === 27;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomInclusive, getHousingType, getPriceMinValue, isEscEvent, showAlert, mapCenterLat, mapCenterLng};
