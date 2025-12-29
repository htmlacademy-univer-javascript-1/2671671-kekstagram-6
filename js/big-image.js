const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = AVATAR_WIDTH;
  avatar.height = AVATAR_HEIGHT;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.append(avatar, text);
  return commentElement;
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  socialComments.append(fragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closeBigPicture);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (pictureData) => {
  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  socialCaption.textContent = pictureData.description;

  renderComments(pictureData.comments);

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', closeBigPicture);
};

const initBigPicture = () => {
  cancelButton.addEventListener('click', closeBigPicture);

  bigPicture.addEventListener('click', (evt) => {
    if (evt.target === bigPicture) {
      closeBigPicture();
    }
  });

  return {
    open: openBigPicture,
    close: closeBigPicture
  };
};

export { initBigPicture };
