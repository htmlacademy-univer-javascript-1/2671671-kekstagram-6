import { initBigPicture } from './big-picture.js';
import { initDrawImages } from './photos.js';

const initGallery = (pictures) => {
  const bigPicture = initBigPicture();

  const picturesContainer = document.querySelector('.pictures');

  const onPictureClick = (pictureData) => {
    bigPicture.open(pictureData);
  };

  initDrawImages(pictures, onPictureClick);

export { initGallery };
