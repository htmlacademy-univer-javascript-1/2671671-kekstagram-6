import { getData } from './api.js';
import { showLoadErrorMessage } from './messages.js';
import { initGallery } from './gallery.js';
import { initForm } from './form.js';
import { initFilters } from './filters.js';

let gallery;

const loadAndInitGallery = async () => {
  try {
    const photos = await getData();

    gallery = initGallery(photos);

    initFilters(photos);

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
