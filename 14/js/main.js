import { similarArray } from './util.js';
import { getData } from './api.js';
import { showLoadErrorMessage } from './messages.js';
import { initGallery } from './gallery.js';
import { initForm } from './form.js';


const loadAndInitGallery = async () => {

  try {
    const photos = await getData();
    initGallery(photos);

  } catch (error) {
    showLoadErrorMessage();
    console.error('Ошибка загрузки фотографий:', error);
  }
};

const initApp = () => {
  loadAndInitGallery();
  initForm();
};

document.addEventListener('DOMContentLoaded', initApp);


console.dir(similarArray, { depth: null, colors: true });
