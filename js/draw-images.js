const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesStorage = document.querySelector('.pictures');

const createImage = (data) => {
  const image = imageTemplate.cloneNode(true);

  const picture = image.querySelector('.picture__img');
  picture.src = data.url;
  picture.alt = data.description;

  image.querySelector('.picture__likes').textContent = data.likes;
  image.querySelector('.picture__comments').textContent = data.comments.length;

  image.dataset.id = data.id;

  const link = image.querySelector('a');
  if (link) {
    link.href = '#';
  }

  return image;
};

const drawImages = (photos) => {
  const pictures = picturesStorage.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const image = createImage(photo);
    fragment.appendChild(image);
  });

  picturesStorage.appendChild(fragment);
};

export { drawImages };
