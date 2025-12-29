const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesStorage = document.querySelector('.pictures');

let nextId = 1;

const createImage = (data) => {
  const image = imageTemplate.cloneNode(true);

  const picture = image.querySelector('.picture__img');
  picture.src = data.url;
  picture.alt = data.description;

  const commentsCount = Array.isArray(data.comments) ? data.comments.length : data.comments;

  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = commentsCount;

  image.dataset.id = nextId;
  data.id = nextId;
  nextId++;

  const link = image.querySelector('a');
  if (link) {
    link.href = '#';
  }

  return image;
};

const drawImages = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const image = createImage(photo);
    fragment.appendChild(image);
  });

  picturesStorage.appendChild(fragment);
};

export { drawImages };
