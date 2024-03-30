// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import { initialCards } from './cards.js';
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardItem, openImage, deleteCard) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardItem.name;
  card.querySelector('.card__image').src = cardItem.link;
  card.querySelector('.card__image').alt = cardItem.name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardItem));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
      if(evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
      }
    })

  return card;
};

initialCards.forEach((cardItem) => {
  const card = createCard(cardItem, openImage, deleteCard);
  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.append(card);
});

function openImage(item) {
  const popupImage = document.querySelector('.popup_type_image');
  setTimeout(function() {
    popupImage.classList.add('popup_is-opened')
  }, 100);
  popupImage.classList.add('popup_is-animated');
  popupImage.querySelector('.popup__image').src = item.link;
  popupImage.querySelector('.popup__image').alt = item.name;
  popupImage.querySelector('.popup__caption').textContent = item.name;

  window.addEventListener('click', function(evt) {
    if(evt.target === popupImage) {
      popupImage.classList.remove('popup_is-opened')
    }
  })

  window.addEventListener('keydown', function(evt) {
    if(evt.key === 'Escape') {
      popupImage.classList.remove('popup_is-opened')
    }
  })
};

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.card');
  deletedCard.remove();
};

const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelectorAll('.popup__close');

const popupCreate = document.querySelector('.popup_type_new-card');
const createButton = document.querySelector('.profile__add-button');

function openPopup(pattern) {
  const popup = pattern;
  setTimeout(function() {
    popup.classList.add('popup_is-opened')
  }, 100);
  popup.classList.add('popup_is-animated');

  window.addEventListener('click', function(evt) {
    if(evt.target === popup) {
      popup.classList.remove('popup_is-opened')
    }
  })

  window.addEventListener('keydown', function(evt) {
    if(evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened')
    }
  })
}

editButton.addEventListener('click', () => openPopup(popupEdit));
createButton.addEventListener('click', () => openPopup(popupCreate));
closePopupButton.forEach((button) => {
  button.addEventListener('click', function(evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened')
  })
});