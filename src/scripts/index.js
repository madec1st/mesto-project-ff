// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './places.js';
import { createCard, likeCard, deleteCard } from './card.js';
import { nameInput, jobInput, profileTitle, profileDescription, openPopup, closePopup } from './modal.js'

initialCards.forEach((cardItem) => {
  const card = createCard(cardItem, openImage, likeCard, deleteCard);
  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.append(card);
});

const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popupCreate = document.querySelector('.popup_type_new-card');
const createButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close');

editButton.addEventListener('click', () => openPopup(popupEdit, true));
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

function disableButton(form) {
  const popupButton = form.querySelector('.popup__button');
  popupButton.classList.add('popup__button-inactive');
  popupButton.setAttribute('disabled', 'disabled');
}

function enableButton(form) {
  const popupButton = form.querySelector('.popup__button');
  popupButton.classList.remove('popup__button-inactive');
  popupButton.removeAttribute('disabled');
}

function checkFormValidity(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const validForm = inputList.every(input => input.validity.valid);

  if (validForm) {
    enableButton(form)
  } else {
    disableButton(form)
  }
}

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  input.classList.add('popup__input-invalid');
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
  input.classList.remove('popup__input-invalid');
}

function isValid(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage)
  } else if (input.validity.valueMissing) {
    input.setCustomValidity('Вы пропустили это поле.')
  } else {
    input.setCustomValidity('')
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }

  checkFormValidity(form);
}

function setEventListenersOnInput(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    input.addEventListener('input', () => isValid(form, input))
  })
}

function enableValidation() {
  const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
  popupFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListenersOnInput(form);
  })
  
}

enableValidation();

function handleFormSubmitUser(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const userName = nameInput.value;
  const userJob = jobInput.value;

  if (nameInput.validity.valid && jobInput.validity.valid) {
    profileTitle.textContent = userName;
    profileDescription.textContent = userJob;
    closePopup(activePopup);
  }
}

const userFormElement = document.forms['edit-profile'];
disableButton(userFormElement);
const cardFormElement = document.forms['new-place'];
disableButton(cardFormElement);
const titleInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const region = titleInput.value;
  const imageLink = linkInput.value;

  if (titleInput.validity.valid && linkInput.validity.valid) {
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
  }
};

userFormElement.addEventListener('submit', handleFormSubmitUser); 
cardFormElement.addEventListener('submit', handleFormSubmitCard); 