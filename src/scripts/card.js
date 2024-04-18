import { deleteCardById, setLike, removeLike } from './api.js';
import { userId } from './index.js'

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardItem, openImage, likeCard, deleteCard) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardItem.name;
  card.querySelector('.card__image').src = cardItem.link;
  card.querySelector('.card__image').alt = cardItem.name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardItem));
  const cardId = cardItem._id;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCardById(cardId);
    deleteCard();
  });
  const likeButton = card.querySelector('.card__like-button');
  const likesQuantity = card.querySelector('.quantity_likes');
  let likesValue = cardItem.likes ? cardItem.likes.length : 0;
  likesQuantity.textContent = likesValue;
  let isLiked = cardItem.likes ? cardItem.likes.some(like => like._id === userId) : false;
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active'); 
  } else { 
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeCard(isLiked, cardId, likeButton, likesQuantity, likesValue);
  });

  return card
};

function likeCard(isLiked, cardId, likeButton, likesQuantity, likesValue) {
  if (isLiked) {
    removeLike(cardId)
      .then(() => {
        likesValue--;
        likesQuantity.textContent = likesValue;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    setLike(cardId)
      .then(() => {
        likesValue++;
        likesQuantity.textContent = likesValue;
        likeButton.classList.add('card__like-button_is-active'); 
      })
      .catch((err) => {
        console.log(err)
      })
  }
};

function deleteCard() {
  const deletedCard = document.querySelector('.card');
  deletedCard.remove();
};

export { createCard, likeCard, deleteCard };