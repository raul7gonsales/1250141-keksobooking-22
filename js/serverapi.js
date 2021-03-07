import { showAlert } from './util.js';
const getDataAddress = 'https://22.javascript.pages.academy/keksobooking/data';
const sendDataAddress = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(getDataAddress)
    .then((response) => response.json())
    .then((declarations) => {
      onSuccess(declarations);
    })
    .catch(() => {
      showAlert('Не удалось получить данные. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    sendDataAddress,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
