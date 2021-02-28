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

const documentLoader = () => {
  pageInactiveState();
  window.addEventListener('DOMContentLoaded', () => {
    pageActiveState();
  });
}

export { documentLoader, pageInactiveState, pageActiveState };
