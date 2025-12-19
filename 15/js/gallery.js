import { initBigPicture } from './big-picture.js';
import { drawImages } from './draw-images.js';

let currentPhotos = [];

const initGallery = (pictures) => {
  const bigPicture = initBigPicture();
  currentPhotos = pictures;

  const picturesContainer = document.querySelector('.pictures');

  const onPictureClick = (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      evt.preventDefault();

      const pictureId = parseInt(pictureElement.dataset.id, 10);
      const pictureData = currentPhotos.find(picture => picture.id === pictureId);

      if (pictureData) {
        bigPicture.open(pictureData);
      }
    }
  };

  drawImages(pictures);

  picturesContainer.addEventListener('click', onPictureClick);

  return {
    update: (newPictures) => {
      currentPhotos = newPictures;
      drawImages(newPictures);

      picturesContainer.addEventListener('click', onPictureClick);
    }
  };
};

export { initGallery };
