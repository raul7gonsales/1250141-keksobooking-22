import { createMap } from './map.js';
import './form.js';
import { setUserFormSubmit, onFormSuccess } from './form.js';
import { getData } from './serverapi.js';

getData((declarations) => {
  createMap(declarations);
});

setUserFormSubmit(onFormSuccess);
