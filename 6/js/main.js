const names = [
  'Святополк',
  'Влад',
  'Галя',
  'Снежанна',
  'Яромир',
];

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const numberOfObjects = 25;

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

const similarArray = Array.from({length: numberOfObjects}, createArray);

console.dir(similarArray, { depth: null, colors: true });
