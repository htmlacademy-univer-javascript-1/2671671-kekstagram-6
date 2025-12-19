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

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');

  if (typeof comment === 'object') {
    avatar.src = comment.avatar || `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`;
    avatar.alt = comment.name || 'Аватар';
  } else {
    avatar.src = `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`;
    avatar.alt = 'Аватар';
  }

  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');

  if (typeof comment === 'object') {
    text.textContent = comment.message || comment;
  } else {
    text.textContent = comment;
  }

  commentElement.append(avatar, text);
  return commentElement;
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (comments.length > 0 && typeof comments[0] === 'object') {
    comments.forEach((comment) => {
      fragment.append(createCommentElement(comment));
    });
  } else {
    comments.forEach((commentText) => {
      const commentObj = { message: commentText };
      fragment.append(createCommentElement(commentObj));
    });
  }

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

  let commentsLength = 0;
  if (Array.isArray(pictureData.comments)) {
    commentsLength = pictureData.comments.length;
  } else if (typeof pictureData.comments === 'number') {
    commentsLength = pictureData.comments;
  }

  commentsCount.textContent = commentsLength;
  socialCaption.textContent = pictureData.description;

  if (Array.isArray(pictureData.comments)) {
    renderComments(pictureData.comments);
  } else {
    const dummyComments = Array.from({ length: Math.min(commentsLength, 5) }, (_, i) => ({
      message: `Комментарий ${i + 1}`,
      name: `Пользователь ${i + 1}`,
      avatar: `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`
    }));
    renderComments(dummyComments);
  }

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
