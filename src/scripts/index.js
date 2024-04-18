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

let userId = null;

Promise.all([getUserData(), getCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    
    cardsData.forEach((cardItem) => {
      const card = createCard(cardItem, openImage, likeCard, deleteCard);
      const cardsContainer = document.querySelector('.places__list');
      cardsContainer.append(card);

      if (userId !== cardItem.owner._id) { 
        const deleteButton = card.querySelector('.card__delete-button');
        deleteButton.disabled = true;
        deleteButton.classList.add('card__delete-button_disabled');
      }

      return userId
    })
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

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const userFormElement = document.forms['edit-profile'];

const createButton = document.querySelector('.profile__add-button');
const popupCreate = document.querySelector('.popup_type_new-card');
const cardFormElement = document.forms['new-place'];

const changeAvatarButton = document.querySelector('.avatar_container');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar')
const changeAvatarFormElement = document.forms['change-avatar']

const closePopupButton = document.querySelectorAll('.popup__close');


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

function openImage(cardItem, validationSettings) {
  const popupImage = document.querySelector('.popup_type_image');
  popupImage.querySelector('.popup__image').src = cardItem.link;
  popupImage.querySelector('.popup__image').alt = cardItem.name;
  popupImage.querySelector('.popup__caption').textContent = cardItem.name;
  openPopup(popupImage, false, validationSettings);
};

enableValidation(validationSettings);

function handleFormSubmitUser(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const submitButton = activePopup.querySelector('.popup__button');

  if (nameInput.validity.valid && jobInput.validity.valid) {
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    setTimeout(() => {
      editProfile(nameInput, jobInput)
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;

        submitButton.textContent = 'Сохранить';
        submitButton.disabled = false;
        closePopup(activePopup);
      })
      .catch((err) => {
        console.log(err)
      })
    }, 500);
    
  }
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const submitButton = activePopup.querySelector('.popup__button');
  const titleInput = activePopup.querySelector('.popup__input_type_card-name');
  const linkInput = activePopup.querySelector('.popup__input_type_url');
  const region = titleInput.value;
  const imageLink = linkInput.value;

  if (titleInput.validity.valid && linkInput.validity.valid) {
    submitButton.textContent = 'Создаём...';
    submitButton.disabled = true;

    setTimeout(() => {
    postCard(titleInput, linkInput)
      .then(() => {
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
        submitButton.textContent = 'Создать';
        submitButton.disabled = false;
        closePopup(activePopup);
      })
      .catch((err) => {
        console.log(err)
      });
    }, 500);
  }
};

function handleFormChangeAvatar(evt) {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_is-opened');
  const linkInput = activePopup.querySelector('.popup__input_type_url');
  const submitButton = activePopup.querySelector('.popup__button');

  if (linkInput.validity.valid) {
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    setTimeout(() => {
      changeAvatar(linkInput)
      .then((userData) => {
        userData.avatar = linkInput.value;
        profileAvatar.src = userData.avatar;
        submitButton.textContent = 'Сохранить';
        submitButton.disabled = false;
        closePopup(activePopup);
      })
      .catch((err) => {
        console.log(err)
      })
    }, 500);
    
  }
}

userFormElement.addEventListener('submit', handleFormSubmitUser); 
cardFormElement.addEventListener('submit', handleFormSubmitCard); 
changeAvatarFormElement.addEventListener('submit', handleFormChangeAvatar);

export { userId }