const OFFER_PRICE_MIN = 10000;
const OFFER_PRICE_MAX = 50000;
const mapFilterForm = document.querySelector('.map__filters');
const housingType = mapFilterForm.querySelector('#housing-type');
const housingPrice = mapFilterForm.querySelector('#housing-price');
const housingRooms = mapFilterForm.querySelector('#housing-rooms');
const housingGuests = mapFilterForm.querySelector('#housing-guests');
const Default = {
  DEFAULT_VALUE: 'any',
};

const filterByType = (ad) => {
  return housingType.value === Default.DEFAULT_VALUE || ad.offer.type === housingType.value
}

const filterByPrice = (ad) => {
  switch (housingPrice.value) {
    case 'middle':
      return (ad.offer.price >= OFFER_PRICE_MIN) && (ad.offer.price <= OFFER_PRICE_MAX);
    case 'low':
      return ad.offer.price < OFFER_PRICE_MIN;
    case 'high':
      return ad.offer.price > OFFER_PRICE_MAX;
    default:
      return true;
  }
}

const filterByRooms = (ad) => {
  return housingRooms.value === Default.DEFAULT_VALUE || ad.offer.rooms === housingRooms.value
}

const filterByGuests = (ad) => {
  return housingGuests.value === Default.DEFAULT_VALUE || ad.offer.guests === housingGuests.value
}

const filteredFeatures = (ad) => {
  let featuresElements = [];
  const checkedFeatures = mapFilterForm.querySelectorAll('#housing-features input:checked');
  checkedFeatures.forEach(element => featuresElements.push(element.value))
  return featuresElements.every((item) => ad.offer.features.includes(item));
}

const getFilters = (ad) => {
  return filterByType(ad) &&
    filterByPrice(ad) &&
    filterByRooms(ad) &&
    filterByGuests(ad) &&
    filteredFeatures(ad)
}

const filterDeclarations = (data) => {
  return data.filter(getFilters);
}

const setFilterChange = (cb) => {
  mapFilterForm.addEventListener('change', () => {
    cb();
  })
}

export { filterDeclarations, setFilterChange }
