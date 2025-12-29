import { names, comments, numberOfObjects } from './data.js';

function getRandomNumber (firstNumber, secondNumber) {

  const lowerNumber = Math.ceil(Math.min(firstNumber, secondNumber));
  const upperNumber = Math.floor(Math.max(firstNumber, secondNumber));
  const result = Math.random() * (upperNumber - lowerNumber + 1) + lowerNumber;

  return Math.floor(result);
}

function getRandomId (minValue, maxValue) {
  const previousValuesList = [];

  return function () {
    let currentValue = getRandomNumber(minValue, maxValue);

    while (previousValuesList.includes(currentValue)) {
      currentValue = getRandomNumber(minValue, maxValue);
    }

    previousValuesList.push(currentValue);

    return currentValue;
  };
}

const createComments = () => ({
  id: getRandomId(10, 500)(),
  avatar: `img/avatar-${getRandomId(1, 6)()}.svg`,
  message: comments[getRandomNumber(0, comments.length - 1)],
  name: names[getRandomNumber(0, names.length - 1)],
});

const similarComments = Array.from({length: getRandomNumber(0, 30)}, createComments);

const createArray = () => ({
  id: getRandomId(1, 25)(),
  url: `photos/${getRandomId(1, 25)()}.jpg`,
  description: 'Классная фотография!',
  likes: getRandomId(15, 200)(),
  comments: similarComments,
});

export const similarArray = Array.from({length: numberOfObjects}, createArray);
