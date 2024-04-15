// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './places.js';
import { createCard, likeCard, deleteCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { validationSettings, clearValidation } from './validation.js';

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

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  clearValidation(popupEdit, validationSettings);
  fillUserData();
});
createButton.addEventListener('click', () => openPopup(popupCreate));
closePopupButton.forEach((button) => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')))
});

function openImage(cardItem, validationSettings) {
  const popupImage = document.querySelector('.popup_type_image');
  popupImage.querySelector('.popup__image').src = cardItem.link;
  popupImage.querySelector('.popup__image').alt = cardItem.name;
  popupImage.querySelector('.popup__caption').textContent = cardItem.name;
  openPopup(popupImage, false, validationSettings);
};

function disableButton(form, validationSettings) {
  const popupButton = form.querySelector(validationSettings.submitButtonClass);
  popupButton.classList.add(validationSettings.inactiveButtonClass);
  popupButton.setAttribute('disabled', 'disabled');
}

function enableButton(form, validationSettings) {
  const popupButton = form.querySelector(validationSettings.submitButtonClass);
  popupButton.classList.remove(validationSettings.inactiveButtonClass);
  popupButton.removeAttribute('disabled');
}

function checkFormValidity(form, validationSettings) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputClass));
  const validForm = inputList.every(input => input.validity.valid);

  if (validForm) {
    enableButton(form, validationSettings)
  } else {
    disableButton(form, validationSettings)
  }
}

function showInputError(form, input, errorMessage, validationSettings) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
  input.classList.add(validationSettings.inputErrorClass);
}

function hideInputError(form, input, validationSettings) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
  input.classList.remove(validationSettings.inputErrorClass);
}

function isValid(form, input, validationSettings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage)
  } else if (input.validity.valueMissing) {
    input.setCustomValidity('Вы пропустили это поле.')
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('Введите адрес сайта.')
  } else {
    input.setCustomValidity('')
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationSettings);
  } else {
    hideInputError(form, input, validationSettings);
  }

  checkFormValidity(form, validationSettings);
}

function setEventListenersOnInput(form, validationSettings) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputClass));
  inputList.forEach((input) => {
    input.addEventListener('input', () => isValid(form, input, validationSettings))
  })
}

function enableValidation(validationSettings) {
  const popupFormList = Array.from(document.querySelectorAll(validationSettings.formClass));
  popupFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListenersOnInput(form, validationSettings);
  })
}

enableValidation(validationSettings);

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
disableButton(userFormElement, validationSettings);
const cardFormElement = document.forms['new-place'];
disableButton(cardFormElement, validationSettings);
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

    clearValidation(activePopup, validationSettings)
    
    closePopup(activePopup);
  }
};

userFormElement.addEventListener('submit', handleFormSubmitUser); 
cardFormElement.addEventListener('submit', handleFormSubmitCard); 


const fetchSettings = {
  url: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '8eef8a7b-16fa-42a1-80e9-e1a5157a1c81',
    'Content-Type': 'application/json'
  }
}

function getUserData() {
  fetch(`${fetchSettings.url}/users/me`, {
    method: 'GET',
    headers: fetchSettings.headers
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
    })
}


getUserData();