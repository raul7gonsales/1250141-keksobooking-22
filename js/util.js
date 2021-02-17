// Возвращает случайное целое число из диапазона (включительно)
const getRandomInclusive = function (min, max) {
  if ((min >= max) || (min < 0) || (max < 0)) {
    alert('Неверное значение диапазона');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Возвращиет случайное число с плавающей точкой с заданным числом знаков после запятой
const getRandomArbitrary = function (min, max, numbersAfterDot) {
  if ((min >= max) || (min < 0) || (max < 0)) {
    alert('Неверное значение диапазона');
  } else {
    return (Math.random() * (max - min) + min).toFixed(numbersAfterDot);
  }
}

// Возвращает случайный элемент массива
const getRandomElement = function (array) {
  return array[getRandomInclusive(0, array.length - 1)];
};

// Возвращает массив из случайных элементов заданного массива
const getRandomArray = function (array) {
  const numberArray = getRandomInclusive(0, array.length - 1);
  const randomArray = [];
  for (let i = 0, l = numberArray; i < l; i++) {
    const arrayElement = getRandomInclusive(0, array.length - 1);
    if (!randomArray.includes(array[arrayElement])) {
      randomArray.push(array[arrayElement]);
    }
  }
  return randomArray;
};

export {getRandomInclusive, getRandomArbitrary, getRandomElement, getRandomArray};
