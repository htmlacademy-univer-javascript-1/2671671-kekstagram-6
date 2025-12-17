import { initBigPicture } from './big-picture.js';
import { drawImages } from './draw-images.js';

const initGallery = (pictures) => {
  const bigPicture = initBigPicture();

  const picturesContainer = document.querySelector('.pictures');

  const onPictureClick = (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      evt.preventDefault();

      const pictureId = parseInt(pictureElement.dataset.id, 10);

      const pictureData = pictures.find(picture => picture.id === pictureId);

      if (pictureData) {
        bigPicture.open(pictureData);
      }
    }
  };

  drawImages(pictures);

  picturesContainer.addEventListener('click', (evt) => {
    onPictureClick(evt);
  });

  return {
    update: (newPictures) => {
      drawImages(newPictures);
    }
  };
};

export { initGallery };
