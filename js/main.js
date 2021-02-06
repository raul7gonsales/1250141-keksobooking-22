const getRandomInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const getRandomArbitrary = function (min, max, numbersAfterDot) {
  return (Math.random() * (max - min) + min).toFixed(numbersAfterDot);
}

// Присвоение значений диапазону и Вызов функций
let minNumber = -2;
let maxNumber = 10;
let partibusLength = 5;

if ((minNumber >= maxNumber) || (minNumber < 0) || (maxNumber < 0)) {
  alert('Неверное значение диапазона');
} else {
  let randomInt = getRandomInclusive (minNumber, maxNumber);
  alert('Случайное целое число: ' + randomInt);

  let randomArbitary = getRandomArbitrary (minNumber, maxNumber, partibusLength);
  alert('Случайное число с плавающей точкой: ' + randomArbitary);
}
