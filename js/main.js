/* global _:readonly */

import './form.js';
import './map.js';
import { renderMarkers } from './map.js';
import { setFilterChange } from './filter.js';
import { setUserFormSubmit, onFormSuccess, addFile } from './form.js';
import { getData } from './serverapi.js';

const RERENDER_DELAY = 500;

getData((declarations) => {
  renderMarkers(declarations);
  setFilterChange(_.debounce(
    () => renderMarkers(declarations),
    RERENDER_DELAY,
  ));
});

addFile();
setUserFormSubmit(onFormSuccess);
