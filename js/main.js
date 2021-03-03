import { createMap } from './map.js';
import './form.js';
import { setUserFormSubmit, onFormSuccess } from './form.js';
import { getData } from './serverapi.js';

const DECLARATION_COUNT = 10;

getData((declarations) => {
  createMap(declarations.slice(0, DECLARATION_COUNT));
});

setUserFormSubmit(onFormSuccess);
