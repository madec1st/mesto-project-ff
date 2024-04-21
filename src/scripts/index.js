// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { validationSettings, disableButton, enableValidation, clearValidation } from './validation.js';
import { getUserData, editProfile, getCards, postCard, changeAvatar } from './api.js';

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const cardsContainer = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const userFormElement = document.forms['edit-profile'];

const createButton = document.querySelector('.profile__add-button');
const popupCreate = document.querySelector('.popup_type_new-card');
const cardFormElement = document.forms['new-place'];

const changeAvatarButton = document.querySelector('.avatar_container');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar')
const changeAvatarFormElement = document.forms['change-avatar']

const popupImage = document.querySelector('.popup_type_image');
const pictureElement = popupImage.querySelector('.popup__image');
const captionElement = popupImage.querySelector('.popup__caption');

const closePopupButton = document.querySelectorAll('.popup__close');

const titlePlaceInput = popupCreate.querySelector('.popup__input_type_card-name');
const linkPlaceInput = popupCreate.querySelector('.popup__input_type_url');

const linkAvatarInput = popupChangeAvatar.querySelector('.popup__input_type_url');

let userId = null;

Promise.all([getUserData(), getCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    
    cardsData.forEach((cardItem) => {
      const card = createCard(cardItem, openImage, likeCard, deleteCard, userId);
      cardsContainer.append(card); 
    })
    return userId
  })
  .catch((err) => {
    console.log(err)
  });

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
  disableButton(userFormElement, validationSettings);
});

createButton.addEventListener('click', () => {
  openPopup(popupCreate);
  clearValidation(popupCreate, validationSettings);
  disableButton(cardFormElement, validationSettings);
});

changeAvatarButton.addEventListener('click', () => {
  openPopup(popupChangeAvatar)
  clearValidation(popupChangeAvatar, validationSettings);
  disableButton(changeAvatarFormElement, validationSettings);
})

closePopupButton.forEach((button) => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')))
});

function openImage(cardItem) {
  pictureElement.src = cardItem.link;
  pictureElement.alt = cardItem.name;
  captionElement.textContent = cardItem.name;
  openPopup(popupImage);
};

enableValidation(validationSettings);

function handleFormSubmitUser(evt) {
  evt.preventDefault();

  evt.submitter.textContent = 'Сохранение...';
  evt.submitter.disabled = true;

  editProfile(nameInput, jobInput)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;

      closePopup(popupEdit);
    })
    .catch((err) => {
      evt.submitter.disabled = false;
      console.log(err)
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Создаём...';
  evt.submitter.disabled = true;
  
  const region = titlePlaceInput.value;
  const imageLink = linkPlaceInput.value;

  postCard(titlePlaceInput, linkPlaceInput)
    .then((cardData) => {
      const newCard = {
        name: region,
        link: imageLink
      }
      newCard.createdAt = cardData.createdAt;
      newCard.likes = cardData.likes;
      newCard.owner = cardData.owner;
      newCard._id = cardData._id;
      
      const addNewCard = (newCard) => {
        const card = createCard(newCard, openImage, likeCard, deleteCard, userId);
        cardsContainer.prepend(card);
      }

      addNewCard(newCard);
      closePopup(popupCreate);
    })
    .catch((err) => {
      evt.submitter.disabled = false;
      console.log(err)
    })
    .finally(() => {
      evt.submitter.textContent = 'Создать';
    });
  }

function handleFormChangeAvatar(evt) {
  evt.preventDefault();

  evt.submitter.textContent = 'Сохранение...';
  evt.submitter.disabled = true;

  changeAvatar(linkAvatarInput)
    .then((userData) => {
      profileAvatar.src = userData.avatar;

      closePopup(popupChangeAvatar);
    })
    .catch((err) => {
      evt.submitter.disabled = false;
      console.log(err)
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
}

userFormElement.addEventListener('submit', handleFormSubmitUser); 
cardFormElement.addEventListener('submit', handleFormSubmitCard); 
changeAvatarFormElement.addEventListener('submit', handleFormChangeAvatar);