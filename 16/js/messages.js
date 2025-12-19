const showLoadErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');

  const messageElement = document.createElement('div');
  messageElement.classList.add('error__inner');
  messageElement.innerHTML = `
    <h2 class="error__title">Ошибка загрузки данных</h2>
    <p class="error__text">Не удалось загрузить фотографии. Пожалуйста, обновите страницу.</p>
    <button type="button" class="error__button">Обновить</button>
  `;

  const button = messageElement.querySelector('.error__button');
  button.addEventListener('click', () => {
    location.reload();
  });

  errorElement.innerHTML = '';
  errorElement.appendChild(messageElement);

  document.body.appendChild(errorElement);

  const onMessageEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeMessage();
    }
  };

  const closeMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  const successElement = successTemplate.querySelector('.success');

  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');

  const onMessageEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeMessage();
    }
  };

  const closeMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');

  document.body.appendChild(errorElement);

  const errorButton = errorElement.querySelector('.error__button');

  const onMessageEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeMessage();
    }
  };

  const closeMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

export { showLoadErrorMessage, showSuccessMessage, showErrorMessage };
