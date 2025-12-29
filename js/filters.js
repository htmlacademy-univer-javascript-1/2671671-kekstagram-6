import { drawImages } from './draw-images.js';


const RANDOM_PHOTOS_COUNT = 10;
const RENDER_DELAY = 500;

const imgFiltersSection = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

let photos = [];
let currentFilter = 'filter-default';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const filterDefault = () => [...photos];

const filterRandom = () => {
  const shuffledPhotos = [...photos]
    .sort(() => Math.random() - 0.5);
  return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
};

const filterDiscussed = () => {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
};

const applyFilter = (filterType) => {
  let filteredPhotos = [];

  switch(filterType) {
    case 'filter-random':
      filteredPhotos = filterRandom();
      break;
    case 'filter-discussed':
      filteredPhotos = filterDiscussed();
      break;
    case 'filter-default':
    default:
      filteredPhotos = filterDefault();
      break;
  }

  drawImages(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter, RENDER_DELAY);

const onFilterChange = (evt) => {
  if (!evt.target.matches('.img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  const clickedFilter = clickedButton.id;

  if (clickedFilter === currentFilter) {
    return;
  }

  filterButtons.forEach(button => {
    button.classList.remove('img-filters__button--active');
  });
  clickedButton.classList.add('img-filters__button--active');

  currentFilter = clickedFilter;
  debouncedApplyFilter(currentFilter);
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;

  imgFiltersSection.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', onFilterChange);

  applyFilter('filter-default');
};

export { initFilters };
