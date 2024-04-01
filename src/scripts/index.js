// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './places.js';
import { createCard, likeCard, deleteCard } from './card.js';
import { openPopup, closePopup } from './modal.js'

initialCards.forEach((cardItem) => {
  const card = createCard(cardItem, openImage, likeCard, deleteCard);
  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.append(card);
});

const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popupCreate = document.querySelector('.popup_type_new-card');
const createButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const imagesOfCard = document.querySelectorAll('.card__image');
const closePopupButton = document.querySelectorAll('.popup__close');

editButton.addEventListener('click', () => openPopup(popupEdit));
createButton.addEventListener('click', () => openPopup(popupCreate));
closePopupButton.forEach((button) => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')))
});

function openImage(cardItem) {
  const popupImage = document.querySelector('.popup_type_image');
  popupImage.querySelector('.popup__image').src = cardItem.link;
  popupImage.querySelector('.popup__image').alt = cardItem.name;
  popupImage.querySelector('.popup__caption').textContent = cardItem.name;
  openPopup(popupImage);
};

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function fillUserData() {
  const currentUserName = profileTitle.textContent;
  const currentUserJob = profileDescription.textContent;

  nameInput.value = currentUserName;
  jobInput.value = currentUserJob;
}

fillUserData();

function handleFormSubmitUser(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const userName = nameInput.value;
  const userJob = jobInput.value;

  profileTitle.textContent = userName;
  profileDescription.textContent = userJob;

  closePopup(activePopup);
}

const userFormElement = document.forms['edit-profile'];
const cardFormElement = document.forms['new-place'];
const titleInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const region = titleInput.value;
  const imageLink = linkInput.value;

  const newCard = {
    name: region,
    link: imageLink
  }

  const addNewCard = (newCard) => {
    const card = createCard(newCard, openImage, likeCard, deleteCard);
    const cardsContainer = document.querySelector('.places__list');
    cardsContainer.prepend(card);
  }

  addNewCard(newCard);

  cardFormElement.reset();

  closePopup(activePopup);
};

userFormElement.addEventListener('submit', handleFormSubmitUser); 
cardFormElement.addEventListener('submit', handleFormSubmitCard); 