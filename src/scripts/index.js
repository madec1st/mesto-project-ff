// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './places.js';
import { createCard, deleteCard } from './card.js';
import { openImage, openPopup, handleFormSubmitUser, cardFormElement, handleFormSubmitCard } from './modal.js'

initialCards.forEach((cardItem) => {
  const card = createCard(cardItem, openImage, deleteCard);
  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.append(card);
});

const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popupCreate = document.querySelector('.popup_type_new-card');
const createButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close');

editButton.addEventListener('click', () => openPopup(popupEdit));
createButton.addEventListener('click', () => openPopup(popupCreate));
closePopupButton.forEach((button) => {
  button.addEventListener('click', function(evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened')
  })
});

const userFormElement = document.forms['edit-profile'];
userFormElement.addEventListener('submit', handleFormSubmitUser); 
cardFormElement.addEventListener('submit', handleFormSubmitCard); 