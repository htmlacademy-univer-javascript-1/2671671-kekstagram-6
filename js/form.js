import Pristine from './vendor/pristine/pristine.min.js';
import { initImageEditor } from './image-editor.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const normalizeHashtags = (hashtagString) => {
  return hashtagString
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.length > 0);
};

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (const tag of hashtags) {
    if (!HASHTAG_REGEX.test(tag)) {
      return false;
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  const hashtags = normalizeHashtags(value);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`;
  }

  for (const tag of hashtags) {
    if (tag[0] !== '#') {
      return 'Хэштег должен начинаться с символа #';
    }

    if (tag.length === 1) {
      return 'Хэштег не может состоять только из #';
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина хэштега ${MAX_HASHTAG_LENGTH} символов`;
    }

    if (!HASHTAG_REGEX.test(tag)) {
      return 'Хэштег может содержать только буквы и цифры';
    }
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  return 'Некорректный хэштег';
};

const validateDescription = (value) => {
  return value.length <= MAX_DESCRIPTION_LENGTH;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

const stopPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};

let imageEditor;

const resetForm = () => {
  uploadForm.reset();
  pristine.reset();

  if (imageEditor) {
    imageEditor.reset();
  }

  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  imageEditor = initImageEditor();

  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', closeForm);

  hashtagsInput.addEventListener('keydown', stopPropagation);
  descriptionInput.addEventListener('keydown', stopPropagation);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', closeForm);

  hashtagsInput.removeEventListener('keydown', stopPropagation);
  descriptionInput.removeEventListener('keydown', stopPropagation);
};

const onFileInputChange = () => {
  if (uploadInput.value) {
    openForm();
    // Код для подстановки изображения (отдельное д/з)
  }
};

/**
 * Отправляет данные формы на сервер
 */
const sendFormData = async (formData) => {
  try {
    await sendData(formData);
    closeForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
    console.error('Ошибка отправки формы:', error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    const formData = new FormData(uploadForm);

    const scaleValue = uploadForm.querySelector('.scale__control--value').value;
    const effectValue = uploadForm.querySelector('input[name="effect"]:checked').value;
    const effectLevelValue = uploadForm.querySelector('.effect-level__value').value;

    formData.append('scale', scaleValue);
    formData.append('effect', effectValue);
    formData.append('effect-level', effectLevelValue);

    await sendFormData(formData);
  }
};

const validateOnInput = () => {
  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });

  descriptionInput.addEventListener('input', () => {
    pristine.validate(descriptionInput);
  });
};

const initForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  uploadForm.addEventListener('submit', onFormSubmit);

  uploadCancel.addEventListener('click', closeForm);

  hashtagsInput.maxLength = MAX_HASHTAG_LENGTH * MAX_HASHTAGS + MAX_HASHTAGS - 1;
  descriptionInput.maxLength = MAX_DESCRIPTION_LENGTH;

  const scaleInput = uploadForm.querySelector('.scale__control--value');
  if (scaleInput) {
    scaleInput.readOnly = true;
  }

  validateOnInput();
};

export { initForm };
