import { deleteCardById, setLike, removeLike } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardItem, openImage, likeCard, deleteCard, userId) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardId = cardItem._id;
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likesQuantity = card.querySelector('.quantity_likes');

  card.querySelector('.card__title').textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;

  cardImage.addEventListener('click', () => openImage(cardItem));

  if (userId !== cardItem.owner._id) { 
    deleteButton.disabled = true;
    deleteButton.classList.add('card__delete-button_disabled');
  }
  deleteButton.addEventListener('click', () => deleteCard(cardId, card));
  
  const likesValue = cardItem.likes ? cardItem.likes.length : 0;
  likesQuantity.textContent = likesValue;
  let isLiked = cardItem.likes ? cardItem.likes.some(like => like._id === userId) : false;
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active'); 
  } else { 
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeCard(cardId, likeButton, likesQuantity);
  });

  return card
};

function likeCard(cardId, likeButton, likesQuantity) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardId)
      .then((cardData) => {
        const newLikesValue = cardData.likes.length
        likesQuantity.textContent = newLikesValue;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    setLike(cardId)
      .then((cardData) => {
        const newLikesValue = cardData.likes.length
        likesQuantity.textContent = newLikesValue;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err)
      })
  }
};

function deleteCard(cardID, card) {
  deleteCardById(cardID)
    .then(() => {
      card.remove()
    })
    .catch((err) => {
      console.log(err)
    })
};

export { createCard, likeCard, deleteCard };