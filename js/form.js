import { getPriceMinValue } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

let numberRoomsTenants = {
  rooms: [1, 2, 3, 100],
  tenants: [3, 2, 1, 0],
};

// Добавление disabled элементам
const addElementDisabled = (formElements) => {
  formElements.forEach(element => {
    element.setAttribute('disabled', 'true');
  });
};

// Удаление disabled элементам
const removeElementDisabled = (formElements) => {
  formElements.forEach(element => {
    element.removeAttribute('disabled');
  });
};

const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormElement = mapForm.querySelectorAll('.map__filter');
const mapFormCheckbox = mapForm.querySelectorAll('.map__checkbox');

const pageInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('ad-form--disabled');
  addElementDisabled(adFormElement);
  addElementDisabled(mapFormElement);
  addElementDisabled(mapFormCheckbox);
};

const pageActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('ad-form--disabled');
  removeElementDisabled(adFormElement);
  removeElementDisabled(mapFormElement);
  removeElementDisabled(mapFormCheckbox);
};

const typeSelect = document.querySelector('#type');


typeSelect.addEventListener('change', () => {
  const priceMin = getPriceMinValue(typeSelect.value);
  document.getElementById('price').placeholder = priceMin;
});
// Время заезда и выезда
let timeIn = document.querySelector('#timein');
let timeOut = document.querySelector('#timeout');
timeIn.addEventListener('change', (event) => {
  timeOut.value = event.target.value
});
timeOut.addEventListener('change', (event) => {
  timeIn.value = event.target.value
});


// Количество комнат - Количество мест
let numberRooms = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');

const capacityDisabled = () => {
  for (let i = 0; i < capacity.length; i++) {
    capacity[i].setAttribute('disabled', 'true');
  }
}
const capacityRemoveDisabled = (start, end) => {
  for (let i = start; i < end + 1; i++) {
    capacity[i].removeAttribute('disabled');
  }
}

if (numberRooms.value == numberRoomsTenants.rooms[0]) {
  capacityDisabled();
  capacity[2].selected = true;
  capacity[2].removeAttribute('disabled');
}


numberRooms.addEventListener('change', () => {
  for (let i = 0; i < numberRooms.length; i++) {
    if (numberRooms.value === capacity[i].value) {
      capacity[i].selected = true;
    }
  }
  if (numberRooms.value == numberRoomsTenants.rooms[0]) {
    capacityDisabled();
    capacityRemoveDisabled(numberRoomsTenants.tenants[1], numberRoomsTenants.tenants[1]);
  }
  if (numberRooms.value == numberRoomsTenants.rooms[1]) {
    capacityDisabled();
    capacityRemoveDisabled(numberRoomsTenants.tenants[2], numberRoomsTenants.tenants[1]);
  }
  if (numberRooms.value == numberRoomsTenants.rooms[2]) {
    capacityDisabled();
    capacityRemoveDisabled(numberRoomsTenants.tenants[3], numberRoomsTenants.tenants[1]);
  }
  if (numberRooms.value == numberRoomsTenants.rooms[3]) {
    capacityDisabled();
    capacity[3].selected = true;
    capacityRemoveDisabled(numberRoomsTenants.tenants[0], numberRoomsTenants.tenants[0]);
  }
});

// Валидация #title
const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Валидация #price
const priceInput = document.querySelector('#price');
priceInput.addEventListener('input', () => {
  priceInput.reportValidity();
});


export { pageInactiveState, pageActiveState };