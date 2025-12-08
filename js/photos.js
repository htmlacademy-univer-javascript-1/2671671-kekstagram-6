const exampleData = [
  {
    id: 1,
    url: 'https://example.com/photo1.jpg',
    description: 'Красивый закат на море',
    likes: 44,
    comments: 6
  },
  {
    id: 2,
    url: 'https://example.com/photo2.jpg',
    description: 'Горный пейзаж',
    likes: 38,
    comments: 5
  },
  {
    id: 3,
    url: 'https://example.com/photo3.jpg',
    description: 'Город ночью',
    likes: 57,
    comments: 9
  }
];

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesStorage = document.querySelector('.pictures');

const createImage = (data) => {
  const image = imageTemplate.cloneNode(true);

  const picture = image.querySelector('.picture__img');
  picture.src = data.url;
  picture.alt = data.description;

  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = data.comments;

  image.dataset.id = data.id;

  return image;
};

const drawImages = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const image = createImage(photo);
    fragment.appendChild(image);
  });

  picturesStorage.innerHTML = '';

  picturesStorage.appendChild(fragment);
};

const initDrawImages = () => {
  drawImages(exampleData);
};

export { initDrawImages };
