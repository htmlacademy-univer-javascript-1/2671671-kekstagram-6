import noUiSlider from './vendor/nouislider/nouislider.js';
import './vendor/nouislider/nouislider.css';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const effects = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    filter: ''
  },

  chrome: {
    name: 'chrome',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale'
  },

  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia'
  },

  marvin: {
    name: 'marvin',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: 'invert'
  },

  phobos: {
    name: 'phobos',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur'
  },

  heat: {
    name: 'heat',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness'
  }
};

let currentEffect = effects.none;

const initSlider = () => {
  if (!effectLevelSlider) {
    return;
  }

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: effects.none.min,
      max: effects.none.max,
    },

    start: effects.none.max,
    step: effects.none.step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  effectLevelContainer.classList.add('hidden');

  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;
    applyEffect(value);
  });
};

const applyEffect = (value) => {
  if (currentEffect.name === 'none') {
    imagePreview.style.filter = '';
    return;
  }

  const filterValue = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  imagePreview.style.filter = filterValue;
};

const updateSlider = (effect) => {
  if (!effectLevelSlider.noUiSlider) {
    return;
  }

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });

  effectLevelValue.value = effect.max;
};

const onEffectChange = (evt) => {
  if (evt.target.type !== 'radio') {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = effects[effectName];

  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    updateSlider(currentEffect);
    applyEffect(currentEffect.max);
  }

  document.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.classList.remove('effects__preview--active');
  });

  const activePreview = evt.target.nextElementSibling.querySelector('.effects__preview');
  if (activePreview) {
    activePreview.classList.add('effects__preview--active');
  }
};

const getScaleValue = () => {
  return parseInt(scaleValueInput.value, 10);
};

const setScaleValue = (value) => {
  scaleValueInput.value = `${value}%`;
  applyScale(value);
};

const applyScale = (value) => {
  const scale = value / 100;
  imagePreview.style.transform = `scale(${scale})`;
};

const onScaleSmallerClick = () => {
  const currentValue = getScaleValue();
  const newValue = Math.max(currentValue - SCALE_STEP, MIN_SCALE);
  setScaleValue(newValue);
};

const onScaleBiggerClick = () => {
  const currentValue = getScaleValue();
  const newValue = Math.min(currentValue + SCALE_STEP, MAX_SCALE);
  setScaleValue(newValue);
};

const resetImageEditor = () => {
  setScaleValue(DEFAULT_SCALE);

  document.querySelector('#effect-none').checked = true;
  currentEffect = effects.none;
  imagePreview.style.filter = '';
  effectLevelContainer.classList.add('hidden');

  if (effectLevelSlider.noUiSlider) {
    updateSlider(effects.none);
  }
};

const initImageEditor = () => {
  initSlider();

  setScaleValue(DEFAULT_SCALE);

  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);

  effectsList.addEventListener('change', onEffectChange);

  document.querySelector('#effect-none').checked = true;

  return {
    reset: resetImageEditor
  };
};

export { initImageEditor };
